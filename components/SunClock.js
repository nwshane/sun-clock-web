import SunCalc from 'suncalc'
import { LocalTime } from 'js-joda'

import SunClockPresentation from './SunClockPresentation'
import AppMessage from './AppMessage'
import getDimensionFromBrowser from '../data/getDimensionFromBrowser'
import dateToLocalTime from '../data/dateToLocalTime'

function getCurrentPosition() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(position => resolve(position))
  })
}

class SunClock extends React.Component {
  constructor() {
    super()
    this.state = {
      sunriseLocalTime: null,
      sunsetLocalTime: null,
      clockDate: new Date(),
      loading: true,
      error: null,
      latitude: null,
      longitude: null,
      dimension: null
    }

    this.fetchSunData = this.fetchSunData.bind(this)
    this.tick = this.tick.bind(this)
    this.setLocationState = this.setLocationState.bind(this)
    this.setDimension = this.setDimension.bind(this)
  }

  setLocationState(coords) {
    return new Promise(resolve => {
      const { latitude, longitude } = coords
      this.setState(Object.assign({}, this.state, { latitude, longitude }))
      resolve(coords)
    })
  }

  fetchSunData() {
    getCurrentPosition()
      .then(position => this.setLocationState(position.coords))
      .then(coords => {
        const { latitude, longitude } = coords
        const { sunrise, sunset } = SunCalc.getTimes(
          this.state.clockDate,
          latitude,
          longitude
        )

        this.setState(
          Object.assign({}, this.state, {
            sunriseLocalTime: dateToLocalTime(sunrise),
            sunsetLocalTime: dateToLocalTime(sunset),
            loading: false
          })
        )
      })
      .catch(error => {
        this.setState(Object.assign({}, this.state, { error }))
      })
  }

  tick() {
    this.setState(
      Object.assign({}, this.state, {
        clockDate: new Date()
      })
    )
  }

  setDimension() {
    this.setState(
      Object.assign({}, this.state, {
        dimension: getDimensionFromBrowser()
      })
    )
  }

  componentDidMount() {
    this.setDimension()

    if ('geolocation' in navigator) {
      this.fetchSunData()
      this.interval = setInterval(this.tick, 1000)
    } else {
      this.state.error = new Error(
        "Your browser doesn't support geolocation; please try another browser."
      )
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    if (this.state.error)
      return <AppMessage text={`Error: ${this.state.error.message}`} />

    if (this.state.loading)
      return (
        <AppMessage text="Loading sunrise and sunset times for your current location!" />
      )
    return <SunClockPresentation {...this.state} />
  }
}

export default SunClock

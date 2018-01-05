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
    this.updateSunTimes = this.updateSunTimes.bind(this)
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
      .then(position => {
        this.setLocationState(position.coords)
        this.updateSunTimes()

        this.setState(
          Object.assign({}, this.state, {
            loading: false
          })
        )
      })
      .catch(error => {
        this.setState(Object.assign({}, this.state, { error }))
      })
  }

  updateSunTimes() {
    const { latitude, longitude, clockDate } = this.state

    const { sunrise, sunset } = SunCalc.getTimes(clockDate, latitude, longitude)

    this.setState(
      Object.assign({}, this.state, {
        sunriseLocalTime: dateToLocalTime(sunrise),
        sunsetLocalTime: dateToLocalTime(sunset)
      })
    )
  }

  tick() {
    const oldClockDate = this.state.clockDate

    this.setState(
      Object.assign({}, this.state, {
        clockDate: new Date()
        // clockDate: new Date(this.state.clockDate.getTime() + 1 * 60000)
      })
    )

    // Manually updating sun times instead of calculating sunrise and
    // sunset from the latitude, longitude, and clockDate, in order to
    // improve performance. TODO Ideally, the app would calculate sunrise
    // and sunset times in the getters, but would memoize those times
    // so that it would only recalculate if the date, latitude, or longitude
    // changed.
    if (oldClockDate.getDay() !== this.state.clockDate.getDay()) {
      this.updateSunTimes()
    }
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
      this.interval = setInterval(this.tick, 1000 / 60)
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

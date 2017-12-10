import axios from 'axios'
import SunClockPresentation from './SunClockPresentation'
import parseSunDataResponse from '../data/parseSunDataResponse'
import { LocalTime } from 'js-joda'
import AppMessage from './AppMessage'

function sendSunDataRequest({ latitude, longitude }) {
  return axios.get(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
  )
}

function getCurrentPosition() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(position => resolve(position))
  })
}

const adjustUTCToLocalTime = time =>
  time.minusMinutes(new Date().getTimezoneOffset())

class SunClock extends React.Component {
  constructor() {
    super()
    this.state = {
      sunrise: null,
      sunset: null,
      currentTime: LocalTime.now(),
      loading: true,
      error: null
    }

    this.fetchSunData = this.fetchSunData.bind(this)
    this.tick = this.tick.bind(this)
  }

  fetchSunData() {
    getCurrentPosition()
      .then(position => sendSunDataRequest(position.coords))
      .then(response => {
        const { sunrise, sunset } = parseSunDataResponse(response.data.results)
        this.setState(
          Object.assign({}, this.state, {
            sunriseLocalTime: adjustUTCToLocalTime(sunrise),
            sunsetLocalTime: adjustUTCToLocalTime(sunset),
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
        currentTime: LocalTime.now()
      })
    )
  }

  componentDidMount() {
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
    const { currentTime, sunrise, sunset } = this.state

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

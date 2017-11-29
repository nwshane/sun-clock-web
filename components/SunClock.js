import axios from 'axios'
import SunClockPresentation from './SunClockPresentation'
import parseSunDataResponse from '../data/parseSunDataResponse'
import moment from 'moment'

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

class SunClock extends React.Component {
  constructor() {
    super()
    this.state = {
      sunrise: null,
      sunset: null,
      currentTime: moment()
    }

    this.fetchSunData = this.fetchSunData.bind(this)
    this.tick = this.tick.bind(this)
  }

  fetchSunData() {
    getCurrentPosition()
      .then(position => sendSunDataRequest(position.coords))
      .then(response => {
        const { sunrise, sunset } = parseSunDataResponse(response.data.results)
        this.setState(Object.assign({}, this.state, { sunrise, sunset }))
      })
  }

  tick() {
    this.setState(
      Object.assign({}, this.state, {
        currentTime: moment()
      })
    )
  }

  componentDidMount() {
    if ('geolocation' in navigator) {
      this.fetchSunData()
      this.interval = setInterval(this.tick, 1000)
    } else {
      /* geolocation IS NOT available */
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { currentTime, sunrise, sunset } = this.state

    if (!currentTime || !sunrise || !sunset) return <p>No Sun data :(</p>

    return <SunClockPresentation {...this.state} />
  }
}

export default SunClock

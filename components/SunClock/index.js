import axios from 'axios'
import SunClockGraphic from './SunClockGraphic'
import parseSunDataResponse from '../../data/parseSunDataResponse'
import moment from 'moment'

function getSunData({ latitude, longitude }) {
  return axios.get(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
  )
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
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        getSunData(position.coords).then(response => {
          const { sunrise, sunset } = parseSunDataResponse(
            response.data.results
          )
          this.setState(Object.assign({}, this.state, { sunrise, sunset }))
        })
      })
    } else {
      /* geolocation IS NOT available */
    }
  }

  tick() {
    this.setState(
      Object.assign({}, this.state, {
        currentTime: moment()
      })
    )
  }

  componentDidMount() {
    this.fetchSunData()
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { currentTime, sunrise, sunset } = this.state

    if (!currentTime || !sunrise || !sunset) return <p>No Sun data :(</p>

    return <SunClockGraphic {...{ currentTime, sunrise, sunset }} />
  }
}

export default SunClock

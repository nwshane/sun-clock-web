import axios from 'axios'
import SunDialGraphic from './SunDialGraphic'
import parseSunDataResponse from '../../data/parseSunDataResponse'
import moment from 'moment'

function getSunData({ latitude, longitude }) {
  return axios.get(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
  )
}

class SunDial extends React.Component {
  constructor() {
    super()
    this.state = {
      sunData: null,
      currentTime: moment()
    }

    this.fetchSunData = this.fetchSunData.bind(this)
    this.tick = this.tick.bind(this)
  }

  fetchSunData() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        getSunData(position.coords).then(response => {
          this.setState({
            sunData: parseSunDataResponse(response.data.results)
          })
        })
      })
    } else {
      /* geolocation IS NOT available */
    }
  }

  tick() {
    this.setState({
      currentTime: moment()
    })
  }

  componentDidMount() {
    this.fetchSunData()
    this.interval = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    if (!this.state.sunData) return <p>No Sun data :(</p>
    const { sunrise, sunset } = this.state.sunData

    const { currentTime } = this.state

    return <SunDialGraphic {...{ currentTime, sunrise, sunset }} />
  }
}

export default SunDial

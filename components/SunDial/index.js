import axios from 'axios'
import SunDialGraphic from './SunDialGraphic'

function getSunData({ latitude, longitude }) {
  return axios.get(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
  )
}

class SunDial extends React.Component {
  constructor() {
    super()
    this.state = {
      sunData: null
    }

    this.fetchSunData = this.fetchSunData.bind(this)
  }

  fetchSunData() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        getSunData(position.coords).then(response => {
          this.setState({
            sunData: response.data.results
          })
        })
      })
    } else {
      /* geolocation IS NOT available */
    }
  }

  componentDidMount() {
    this.fetchSunData()
  }

  render() {
    if (!this.state.sunData) return <p>No Sun data :(</p>
    return <SunDialGraphic sunData={this.state.sunData} />
  }
}

export default SunDial

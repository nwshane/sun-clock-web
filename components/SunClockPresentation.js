import formatTime from '../data/formatTime'

const adjustUTCToLocalTime = time =>
  time.minusMinutes(new Date().getTimezoneOffset())

const getUTCSunrise = state => state.sunrise
const getUTCSunset = state => state.sunset

const getLocalSunriseTime = state => adjustUTCToLocalTime(getUTCSunrise(state))
const getLocalSunsetTime = state => adjustUTCToLocalTime(getUTCSunset(state))

const getCurrentTime = state => state.currentTime

class SunClockPresentation extends React.Component {
  render() {
    return (
      <div>
        <p>Sunrise: {formatTime(getLocalSunriseTime(this.props))}</p>
        <p>Sunset: {formatTime(getLocalSunsetTime(this.props))}</p>
        <p>Current time: {formatTime(getCurrentTime(this.props))}</p>
      </div>
    )
  }
}

export default SunClockPresentation

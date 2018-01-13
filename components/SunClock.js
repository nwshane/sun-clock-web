import SunCalc from 'suncalc'
import { LocalTime } from 'js-joda'
import { connect } from 'react-redux'

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
      error: null
    }

    this.fetchSunData = this.fetchSunData.bind(this)
    this.tick = this.tick.bind(this)
    this.updateSunTimes = this.updateSunTimes.bind(this)
  }

  fetchSunData() {
    getCurrentPosition()
      .then(position => {
        const { setLatitude, setLongitude } = this.props
        const { latitude, longitude } = position.coords
        setLatitude(latitude)
        setLongitude(longitude)

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
    const { clockDate } = this.state

    const {
      latitude,
      longitude,
      setSunriseLocalTime,
      setSunsetLocalTime
    } = this.props

    const { sunrise, sunset } = SunCalc.getTimes(clockDate, latitude, longitude)

    setSunriseLocalTime(dateToLocalTime(sunrise))
    setSunsetLocalTime(dateToLocalTime(sunset))

    this.setState(
      Object.assign({}, this.state, {
        sunriseLocalTime: dateToLocalTime(sunrise),
        sunsetLocalTime: dateToLocalTime(sunset)
      })
    )
  }

  tick() {
    const oldClockDate = this.state.clockDate
    const newClockDate = new Date()
    // const newClockDate = new Date(this.state.clockDate.getTime() + 1 * 60000)

    this.props.setClockDate(newClockDate)

    this.setState(
      Object.assign({}, this.state, {
        clockDate: newClockDate
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

  componentDidMount() {
    this.props.setDimension()

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
    return <SunClockPresentation />
  }
}

const mapStateToProps = state => ({
  latitude: state.latitude,
  longitude: state.longitude
})

const setLatitude = latitude => state => ({
  ...state,
  latitude
})

const setLongitude = longitude => state => ({
  ...state,
  longitude
})

const setSunriseLocalTime = sunriseLocalTime => state => ({
  ...state,
  sunriseLocalTime
})

const setSunsetLocalTime = sunsetLocalTime => state => ({
  ...state,
  sunsetLocalTime
})

const setClockDate = clockDate => state => ({
  ...state,
  clockDate
})

const setDimension = dimension => state => ({
  ...state,
  dimension: getDimensionFromBrowser()
})

const mapDispatchToProps = dispatch => ({
  setLatitude: latitude => dispatch(setLatitude(latitude)),
  setLongitude: longitude => dispatch(setLongitude(longitude)),
  setSunriseLocalTime: sunriseLocalTime =>
    dispatch(setSunriseLocalTime(sunriseLocalTime)),
  setSunsetLocalTime: sunsetLocalTime =>
    dispatch(setSunsetLocalTime(sunsetLocalTime)),
  setClockDate: clockDate => dispatch(setClockDate(clockDate)),
  setDimension: dimension => dispatch(setDimension(dimension))
})

export default connect(mapStateToProps, mapDispatchToProps)(SunClock)

import SunCalc from 'suncalc'
import { LocalTime } from 'js-joda'
import { connect } from 'react-redux'

import SunClockPresentation from './SunClockPresentation'
import AppMessage from './AppMessage'
import getDimensionFromBrowser from '../data/getDimensionFromBrowser'
import dateToLocalTime from '../data/dateToLocalTime'
import { getClockDate } from '../data/getters'

function getCurrentPosition() {
  return new Promise(resolve => {
    navigator.geolocation.getCurrentPosition(position => resolve(position))
  })
}

class SunClock extends React.Component {
  componentDidMount() {
    this.props.setDimension()

    if ('geolocation' in navigator) {
      this.props.fetchSunData()
      this.props.startTick()
    } else {
      this.props.setError(
        new Error(
          "Your browser doesn't support geolocation; please try another browser."
        )
      )
    }
  }

  componentWillUnmount() {
    this.props.clearTick(this.interval)
  }

  render() {
    if (this.props.error)
      return <AppMessage text={`Error: ${this.state.error.message}`} />

    if (this.props.loading)
      return (
        <AppMessage text="Loading sunrise and sunset times for your current location!" />
      )
    return <SunClockPresentation />
  }
}

const mapStateToProps = state => ({
  error: state.error,
  loading: state.loading
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

const setLoading = loading => state => ({
  ...state,
  loading
})

const setError = error => state => ({
  ...state,
  error
})

const updateSunTimes = () => () => (dispatch, getState) => {
  const { latitude, longitude, clockDate } = getState()

  const { sunrise, sunset } = SunCalc.getTimes(clockDate, latitude, longitude)

  dispatch(setSunriseLocalTime(dateToLocalTime(sunrise)))
  dispatch(setSunsetLocalTime(dateToLocalTime(sunset)))
}

const fetchSunData = () => () => dispatch => {
  getCurrentPosition()
    .then(position => {
      const { latitude, longitude } = position.coords
      dispatch(setLatitude(latitude))
      dispatch(setLongitude(longitude))
      dispatch(updateSunTimes())
      dispatch(setLoading(false))
    })
    .catch(error => {
      this.props.setError(error)
    })
}

const tick = () => () => (dispatch, getState) => {
  const oldClockDate = getClockDate(getState())
  const newClockDate = new Date()
  // const newClockDate = new Date(this.state.clockDate.getTime() + 1 * 60000)
  dispatch(setClockDate(newClockDate))

  // Manually updating sun times instead of calculating sunrise and
  // sunset from the latitude, longitude, and clockDate, in order to
  // improve performance. TODO Ideally, the app would calculate sunrise
  // and sunset times in the getters, but would memoize those times
  // so that it would only recalculate if the date, latitude, or longitude
  // changed.
  if (oldClockDate.getDay() !== getClockDate(getState()).getDay()) {
    dispatch(updateSunTimes())
  }
}

const startTick = () => () => dispatch => ({
  interval: setInterval(() => {
    dispatch(tick())
  }, 1000 / 60)
})

const clearTick = () => () => (dispatch, getState) => {
  clearInterval(getState().interval)
  dispatch(state => ({
    ...state,
    interval: null
  }))
}

const mapDispatchToProps = dispatch => ({
  setDimension: dimension => dispatch(setDimension(dimension)),
  setError: error => dispatch(setError(error)),
  fetchSunData: () => dispatch(fetchSunData()),
  startTick: () => dispatch(startTick()),
  clearTick: () => dispatch(clearTick())
})

export default connect(mapStateToProps, mapDispatchToProps)(SunClock)

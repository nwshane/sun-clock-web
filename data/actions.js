import SunCalc from 'suncalc'
import { getClockDate } from './getters'
import dateToLocalTime from './dateToLocalTime'
import getDimensionFromBrowser from './getDimensionFromBrowser'

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

export const setDimension = dimension => state => ({
  ...state,
  dimension: getDimensionFromBrowser()
})

const setLoading = loading => state => ({
  ...state,
  loading
})

export const setError = error => state => ({
  ...state,
  error
})

const updateSunTimes = () => () => (dispatch, getState) => {
  const { latitude, longitude, clockDate } = getState()

  const { sunrise, sunset } = SunCalc.getTimes(clockDate, latitude, longitude)

  dispatch(setSunriseLocalTime(dateToLocalTime(sunrise)))
  dispatch(setSunsetLocalTime(dateToLocalTime(sunset)))
}

export const fetchSunData = () => () => dispatch => {
  function getCurrentPosition() {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(position => resolve(position))
    })
  }

  getCurrentPosition()
    .then(position => {
      const { latitude, longitude } = position.coords
      dispatch(setLatitude(latitude))
      dispatch(setLongitude(longitude))
      dispatch(updateSunTimes())
      dispatch(setLoading(false))
    })
    .catch(error => {
      dispatch(setError(error))
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

export const startTick = () => () => dispatch => ({
  interval: setInterval(() => {
    dispatch(tick())
  }, 1000 / 60)
})

export const clearTick = () => () => (dispatch, getState) => {
  clearInterval(getState().interval)
  dispatch(state => ({
    ...state,
    interval: null
  }))
}

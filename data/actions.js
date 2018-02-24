import SunCalc from 'suncalc'

import { getClockDate } from './getters'
import dateToLocalTime from './dateToLocalTime'
import { getSelectedLocation, getLocations } from '~/data/getters/location'

const setCurrentLocation = currentLocation => state => {
  const currentLocationDefaultValues = {
    id: 'current',
    name: 'Current Location'
  }

  return {
    ...state,
    locations: {
      [currentLocationDefaultValues.id]: {
        ...currentLocation,
        ...currentLocationDefaultValues
      },
      ...getLocations(state)
    }
  }
}

const setSelectedLocationId = selectedLocationId => state => ({
  ...state,
  selectedLocationId
})

const setSunriseDate = sunriseDate => state => ({
  ...state,
  sunriseDate
})

const setSunsetDate = sunsetDate => state => ({
  ...state,
  sunsetDate
})

const setClockDate = clockDate => state => ({
  ...state,
  clockDate
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
  const state = getState()

  const { sunrise, sunset } = SunCalc.getTimes(
    getClockDate(state),
    getSelectedLocation(state).latitude,
    getSelectedLocation(state).longitude
  )

  dispatch(setSunriseDate(sunrise))
  dispatch(setSunsetDate(sunset))
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
      dispatch(setCurrentLocation({ latitude, longitude }))
      dispatch(updateSunTimes())
      dispatch(setLoading(false))
    })
    .catch(error => {
      dispatch(setError(error))
    })
}

const tick = () => () => (dispatch, getState) => {
  const oldClockDate = getClockDate(getState())
  const newClockDate = new Date(oldClockDate.getTime() + 1 * 3600)
  // const newClockDate = new Date()

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
  }, 1000)
})

export const clearTick = () => () => (dispatch, getState) => {
  clearInterval(getState().interval)
  dispatch(state => ({
    ...state,
    interval: null
  }))
}

export const setClockDateAndRetainTime = newDate => () => (
  dispatch,
  getState
) => {
  const oldDate = getClockDate(getState())
  dispatch(
    setClockDate(
      new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        newDate.getDate(),
        oldDate.getHours(),
        oldDate.getMinutes(),
        oldDate.getSeconds()
      )
    )
  )
  dispatch(updateSunTimes())
}

export const setNewLocation = selectedLocationId => () => dispatch => {
  dispatch(setSelectedLocationId(selectedLocationId))
  dispatch(updateSunTimes())
}

export const toggleAboutOverlay = () => state => ({
  ...state,
  overlay: state.overlay === 'about' ? null : 'about'
})

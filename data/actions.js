import SunCalc from 'suncalc'

import { getRateOfClockDateChange, getClockDate } from './getters'
import { getSelectedLocation, getLocations } from '~/data/getters/location'

const setCurrentLocation = currentLocation => state => {
  const currentLocationDefaultValues = {
    id: 'current',
    name: 'Current Location'
  }

  return {
    ...state,
    locations: {
      ...getLocations(state),
      [currentLocationDefaultValues.id]: {
        ...currentLocation,
        ...currentLocationDefaultValues
      }
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

export const setClockDate = clockDate => state => ({
  ...state,
  clockDate
})

export const setError = error => state => ({
  ...state,
  error
})

export const setRateOfClockDateChange = rateOfClockDateChange => state => ({
  ...state,
  rateOfClockDateChange
})

export const updateSunTimes = () => () => (dispatch, getState) => {
  const state = getState()
  const { latitude, longitude } = getSelectedLocation(state)

  // If current location is selected, but latitude and longitude
  // haven't been loaded yet, then don't try to update sun times
  if (!latitude || !longitude) return

  const { sunrise, sunset } = SunCalc.getTimes(
    getClockDate(state),
    latitude,
    longitude
  )

  if (isNaN(sunrise.getTime()) || isNaN(sunset.getTime())) {
    console.warn('invalid date(s)', {
      clockDate: getClockDate(state),
      latitude,
      longitude,
      sunrise,
      sunset
    })
    return
  }

  dispatch(setSunriseDate(sunrise))
  dispatch(setSunsetDate(sunset))
}

export const fetchCurrentLocationData = () => () => async dispatch => {
  dispatch(setCurrentLocation({ loading: true }))
  function getCurrentPosition() {
    return new Promise(resolve => {
      navigator.geolocation.getCurrentPosition(position => resolve(position))
    })
  }

  let position

  try {
    position = await getCurrentPosition()
  } catch (error) {
    dispatch(setError(error))
    return
  }

  const { latitude, longitude } = position.coords
  dispatch(setCurrentLocation({ latitude, longitude }))
  dispatch(updateSunTimes())
}

const tickAmountMilliseconds = 30

const tick = () => () => (dispatch, getState) => {
  const oldClockDate = getClockDate(getState())
  const newClockDate = new Date(
    oldClockDate.getTime() +
      tickAmountMilliseconds * getRateOfClockDateChange(getState())
  )

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
  }, tickAmountMilliseconds)
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

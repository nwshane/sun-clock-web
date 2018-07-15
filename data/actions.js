import SunCalc from 'suncalc'

import {
  getRateOfClockDateChange,
  getClockDate,
  getLocalClockDate
} from './getters'
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

const _setClockDate = clockDate => state => ({
  ...state,
  clockDate
})

export const setClockDate = newDate => () => (dispatch, getState) => {
  const oldState = getState()
  dispatch(_setClockDate(newDate))

  // Manually updating sun times instead of calculating sunrise and
  // sunset from the latitude, longitude, and clockDate, in order to
  // improve performance. TODO Ideally, the app would calculate sunrise
  // and sunset times in the getters, but would memoize those times
  // so that it would only recalculate if the date, latitude, or longitude
  // changed.
  const oldLocalClockDate = getLocalClockDate(oldState)
  const newLocalClockDate = getLocalClockDate(getState())
  if (oldLocalClockDate.getDay() !== newLocalClockDate.getDay()) {
    dispatch(updateSunTimes())
  }
}

export const setError = error => state => ({
  ...state,
  error
})

export const setRateOfClockDateChange = rateOfClockDateChange => state => {
  const rateOfClockDateChangeInt = parseInt(rateOfClockDateChange)
  return {
    ...state,
    // if the new rate is not an actual number, just use 1
    rateOfClockDateChange:
      typeof rateOfClockDateChangeInt === 'number' &&
      !Number.isNaN(rateOfClockDateChangeInt)
        ? rateOfClockDateChangeInt
        : 1
  }
}

export const updateSunTimes = () => () => (dispatch, getState) => {
  const state = getState()
  const { latitude, longitude } = getSelectedLocation(state)

  // If current location is selected, but latitude and longitude
  // haven't been loaded yet, then don't try to update sun times
  if (!latitude || !longitude) return

  const clockDate = getClockDate(state)

  // we pass in the clock date (and not the local clock date) here
  // because SunCalc assumes that the first date is in the time of the
  // host computer's timezone, and then figures out the "local" date
  // using the latitude and longitude.
  // (this is inferred from observing how SunCalc calculates sun times
  // for different dates)
  let { sunrise, sunset } = SunCalc.getTimes(clockDate, latitude, longitude)

  if (isNaN(sunrise.getTime()) || isNaN(sunset.getTime())) {
    const midnight = new Date(
      clockDate.getFullYear(),
      clockDate.getMonth(),
      clockDate.getDate()
    )

    sunrise = midnight
    sunset = midnight
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

const tickAmountMilliseconds = 15

const tick = () => () => (dispatch, getState) => {
  const oldState = getState()
  const oldClockDate = getClockDate(oldState)
  const newClockDate = new Date(
    oldClockDate.getTime() +
      tickAmountMilliseconds * getRateOfClockDateChange(getState())
  )

  dispatch(setClockDate(newClockDate))
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

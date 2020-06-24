import SunCalc from 'suncalc'

import {
  getRateOfClockDateChange,
  getClockDate,
  getLocalClockDate,
  getPaused,
  getNumDayDifferenceBtwLocalAndClockDate,
} from './getters'
import { getSelectedLocation, getLocations } from '~/data/getters/location'

const setCurrentLocation = (currentLocation) => (state) => {
  const currentLocationDefaultValues = {
    id: 'current',
    name: 'Current Location',
  }

  return {
    ...state,
    locations: {
      ...getLocations(state),
      [currentLocationDefaultValues.id]: {
        ...currentLocation,
        ...currentLocationDefaultValues,
      },
    },
  }
}

const setSelectedLocationId = (selectedLocationId) => (state) => ({
  ...state,
  selectedLocationId,
})

const setSunriseDate = (sunriseDate) => (state) => ({
  ...state,
  sunriseDate,
})

const setSunsetDate = (sunsetDate) => (state) => ({
  ...state,
  sunsetDate,
})

const _setClockDate = (clockDate) => (state) => ({
  ...state,
  clockDate,
})

export const setClockDate = (newDate) => () => (dispatch, getState) => {
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

export const setPaused = (paused) => (state) => ({
  ...state,
  paused,
})

export const setError = (error) => (state) => ({
  ...state,
  error,
})

export const setRateOfClockDateChange = (rateOfClockDateChange) => (state) => {
  const rateOfClockDateChangeInt = parseInt(rateOfClockDateChange)
  return {
    ...state,
    // if the new rate is not an actual number, just use 1
    rateOfClockDateChange:
      typeof rateOfClockDateChangeInt === 'number' &&
      !Number.isNaN(rateOfClockDateChangeInt)
        ? rateOfClockDateChangeInt
        : 1,
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

export const fetchCurrentLocationData = () => () => async (dispatch) => {
  dispatch(setCurrentLocation({ loading: true }))
  function getCurrentPosition() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => resolve(position))
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

// ideally animation should be 60 frames per second
// 1000 ms / 60 frames => 16.67 ms/frame
// round down to 16
const tickAmountMilliseconds = 16

const getNewClockDate = (state) => {
  const rateOfClockDateChange = getRateOfClockDateChange(state)
  const oldClockDate = getClockDate(state)

  const diffMilliseconds = Math.abs(
    oldClockDate.valueOf() - new Date().valueOf()
  )
  const lessThanMinDiff = diffMilliseconds < 60000

  // If the speed is in real time, and there's less than a minute difference
  // between the clock date and the actual date, then just use the actual date.
  // The reason for this approach is that using setInterval to keep time is
  // not super accurate, and so if we CAN just use the current date rather
  // than calculating it from the previous date, then we SHOULD.
  if (rateOfClockDateChange === 1 && lessThanMinDiff) {
    return new Date()
  }

  return new Date(
    oldClockDate.getTime() + tickAmountMilliseconds * rateOfClockDateChange
  )
}

const tick = () => () => (dispatch, getState) => {
  const state = getState()
  if (getPaused(state)) return
  dispatch(setClockDate(getNewClockDate(state)))
}

export const startTick = () => () => (dispatch) => ({
  interval: setInterval(() => {
    dispatch(tick())
  }, tickAmountMilliseconds),
})

export const clearTick = () => () => (dispatch, getState) => {
  clearInterval(getState().interval)
  dispatch((state) => ({
    ...state,
    interval: null,
  }))
}

export const setClockDateAndRetainTime = (
  newDate,
  { ensureShowSelectedDate }
) => () => (dispatch, getState) => {
  const oldState = getState()
  const oldDate = getClockDate(oldState)
  dispatch(
    setClockDate(
      new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        // if the user wants to view June 6th, and the day in the
        // selected location is different from the current location's
        // day, we still want June 6th to show on the clock.
        // we achieve this by modifying the date by the difference of the two.
        newDate.getDate() -
          (ensureShowSelectedDate
            ? getNumDayDifferenceBtwLocalAndClockDate(oldState)
            : 0),
        oldDate.getHours(),
        oldDate.getMinutes(),
        oldDate.getSeconds()
      )
    )
  )
  dispatch(updateSunTimes())
}

export const setNewLocation = (selectedLocationId) => () => (dispatch) => {
  dispatch(setSelectedLocationId(selectedLocationId))
  dispatch(updateSunTimes())
}

export const toggleAboutOverlay = () => (state) => ({
  ...state,
  overlay: state.overlay === 'about' ? null : 'about',
})

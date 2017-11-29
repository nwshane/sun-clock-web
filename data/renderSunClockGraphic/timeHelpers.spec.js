import moment from 'moment'
import {
  getDaylightMilliseconds,
  getNighttimeMilliseconds,
  currentlyDaytime
} from './timeHelpers'

const sunrise = moment().hours(9)
const sunset = moment().hours(15)

describe('getDaylightMilliseconds', () => {
  test('returns number milliseconds between sunrise and sunset', () => {
    expect(getDaylightMilliseconds(sunrise, sunset)).toEqual(6 * 60 * 60 * 1000)
  })
})

describe('getNighttimeMilliseconds', () => {
  test('returns number milliseconds outside of sunrise and sunset', () => {
    expect(getNighttimeMilliseconds(sunrise, sunset)).toEqual(
      18 * 60 * 60 * 1000
    )
  })
})

describe('currentlyDaytime', () => {
  const state = {
    sunrise: moment().hours(9),
    sunset: moment().hours(15)
  }

  test('returns true if currently after sunrise and before sunset', () => {
    state.currentTime = moment().hours(10)
    expect(currentlyDaytime(state))
  })

  test('returns false if before sunrise', () => {
    state.currentTime = moment().hours(8)
    expect(currentlyDaytime(state)).toEqual(false)
  })

  test('returns false if after sunrise', () => {
    state.currentTime = moment().hours(16)
    expect(currentlyDaytime(state)).toEqual(false)
  })
})

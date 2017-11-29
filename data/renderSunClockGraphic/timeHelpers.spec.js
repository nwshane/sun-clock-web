import moment from 'moment'
import {
  getDaylightMilliseconds,
  getNighttimeMilliseconds
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

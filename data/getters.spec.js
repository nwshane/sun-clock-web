import { getSunriseAngle, getSunsetAngle } from './getters'
import { LocalTime } from 'js-joda'

describe('getSunriseAngle', () => {
  test('calculates sunrise angle relative to noon at 0 degrees', () => {
    expect(
      getSunriseAngle({ sunriseDate: new Date(1970, 1, 1, 10, 30, 0) })
    ).toEqual(337.5)
  })
})

describe('getSunsetAngle', () => {
  test('calculates sunset angle relative to noon at 0 degrees', () => {
    expect(
      getSunsetAngle({ sunsetDate: new Date(1970, 1, 1, 20, 0, 0) })
    ).toEqual(120)
  })
})

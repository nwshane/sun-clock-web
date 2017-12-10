import { getSunriseAngle, getSunsetAngle } from './getters'
import { LocalTime } from 'js-joda'

describe('getSunriseAngle', () => {
  test('calculates sunrise angle relative to noon at 0 degrees', () => {
    expect(getSunriseAngle({ sunrise: LocalTime.of(10, 30) })).toEqual(337.5)
  })
})

describe('getSunsetAngle', () => {
  test('calculates sunset angle relative to noon at 0 degrees', () => {
    expect(getSunsetAngle({ sunset: LocalTime.of(20) })).toEqual(120)
  })
})

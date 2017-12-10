import standardizeAngle from './standardizeAngle'

describe('standardizeAngle', () => {
  test('converts angle below 0 to equivalent between 0 and 360', () => {
    expect(standardizeAngle(-950)).toEqual(130)
  })

  test('converts angle of 360 to 0', () => {
    expect(standardizeAngle(360)).toEqual(0)
  })

  test('does not change 0', () => {
    expect(standardizeAngle(0)).toEqual(0)
  })

  test('converts angle above 360 to equivalent between 0 and 360', () => {
    expect(standardizeAngle(1100)).toEqual(20)
  })
})

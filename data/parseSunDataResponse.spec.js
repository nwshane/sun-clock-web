import parseSunDataResponse from './parseSunDataResponse'

describe('parseSunDataResponse', () => {
  test('transforms strings containing AM into time objects', () => {
    const parsed = parseSunDataResponse({
      sunrise: '10:20:37 AM'
    })

    expect(parsed.sunrise.hour()).toEqual(10)
    expect(parsed.sunrise.minute()).toEqual(20)
    expect(parsed.sunrise.second()).toEqual(37)
  })

  test('transforms strings containing PM into time objects', () => {
    const parsed = parseSunDataResponse({
      crazy_time: '3:15:59 PM'
    })

    expect(parsed.crazy_time.hour()).toEqual(15)
    expect(parsed.crazy_time.minute()).toEqual(15)
    expect(parsed.crazy_time.second()).toEqual(59)
  })

  test('does not transform strings just containing a time', () => {
    const response = {
      daylight: '8:30:24'
    }

    expect(parseSunDataResponse(response)).toEqual(response)
  })

  test('handles 12 PM correctly', () => {
    const parsed = parseSunDataResponse({
      crazy_time: '12:15:59 PM'
    })

    expect(parsed.crazy_time.hour()).toEqual(12)
  })

  test('handles 12 AM correctly', () => {
    const parsed = parseSunDataResponse({
      crazy_time: '12:15:59 AM'
    })

    expect(parsed.crazy_time.hour()).toEqual(0)
  })
})

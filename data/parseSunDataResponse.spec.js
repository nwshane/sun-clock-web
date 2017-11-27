import parseSunDataResponse from './parseSunDataResponse'
import moment from 'moment'

describe('parseSunDataResponse', () => {
  test('transforms strings containing AM into momentJS objects', () => {
    const parsed = parseSunDataResponse({
      sunrise: '10:20:37 AM'
    })

    expect(parsed.sunrise.hours()).toEqual(10)
    expect(parsed.sunrise.minutes()).toEqual(20)
    expect(parsed.sunrise.seconds()).toEqual(37)
  })

  test('transforms strings containing PM into momentJS objects', () => {
    const parsed = parseSunDataResponse({
      crazy_time: '3:15:59 PM'
    })

    expect(parsed.crazy_time.hours()).toEqual(15)
    expect(parsed.crazy_time.minutes()).toEqual(15)
    expect(parsed.crazy_time.seconds()).toEqual(59)
  })

  test('does not transform strings just containing a time', () => {
    const response = {
      daylight: '8:30:24'
    }

    expect(parseSunDataResponse(response)).toEqual(response)
  })
})

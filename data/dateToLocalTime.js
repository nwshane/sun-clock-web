import { Instant, LocalTime } from 'js-joda'
import { getSelectedLocation } from '~/data/getters/location'

// Checks whether `toLocaleString` can take a timeZone option
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
function toLocaleStringSupportsLocales() {
  try {
    new Date().toLocaleString('i')
  } catch (e) {
    return e.__proto__.name === 'RangeError'
  }
  return false
}

const dateToLocalTimeZoneTime = date =>
  LocalTime.ofInstant(Instant.ofEpochMilli(date.getTime()))

const dateToTimeZoneTime = (date, timeZone) => {
  if (toLocaleStringSupportsLocales()) {
    const timeMatches = date
      .toLocaleString('en-US', {
        timeZone,
        hour12: false,
        formatMatcher: 'basic'
      })
      .match(/(\d+):(\d+):(\d+)/)

    return LocalTime.of(timeMatches[1], timeMatches[2], timeMatches[3])
  } else {
    console.warn('Browser does not have support for other time zones')
    return dateToLocalTimeZoneTime(date)
  }
}

export default (state, date) => {
  const selectedTimeZone = getSelectedLocation(state).timeZone

  if (!selectedTimeZone) return dateToLocalTimeZoneTime(date)

  return dateToTimeZoneTime(date, selectedTimeZone)
}

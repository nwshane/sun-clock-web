import { Instant, LocalTime } from 'js-joda'
import { getSelectedLocation } from '~/data/getters/location'
import memoize from 'fast-memoize'

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

const convertDateToTime = (date) =>
  LocalTime.ofInstant(Instant.ofEpochMilli(date.getTime()))

const memoizedToLocalString = memoize((date, timeZone) =>
  date.toLocaleString('en-US', {
    timeZone,
    hour12: false,
    formatMatcher: 'basic',
  })
)

export const localizeDate = (state, date) => {
  const { timeZone } = getSelectedLocation(state)

  if (!timeZone) return date

  // if (toLocaleStringSupportsLocales()) {
  const localDateString = memoizedToLocalString(date, timeZone)

  return new Date(Date.parse(localDateString))
  // } else {
  //   console.warn('Browser does not have support for other time zones')
  //   return dateToLocalTimeZoneTime(date)
  // }
}

export const getLocalTime = (state, date) =>
  convertDateToTime(localizeDate(state, date))

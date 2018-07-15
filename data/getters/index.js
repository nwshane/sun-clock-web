import { ChronoField, LocalTime } from 'js-joda'

import { YEAR_CIRCLE_MIN_SPEED } from '~/data/constants'
import standardizeAngle from '../standardizeAngle'
import { localizeDate, getLocalTime } from '../localize'
import { getSelectedLocation } from './location'

export const getSunriseDate = state => state.sunriseDate
export const getSunsetDate = state => state.sunsetDate

export const getSunriseTime = state =>
  getLocalTime(state, getSunriseDate(state))
export const getSunsetTime = state => getLocalTime(state, getSunsetDate(state))

export const getClockDate = state => state.clockDate
export const getLocalClockDate = state =>
  localizeDate(state, getClockDate(state))

export const getOverlay = state => state.overlay

export const shouldShowDayCircle = state =>
  getRateOfClockDateChange(state) < YEAR_CIRCLE_MIN_SPEED
export const getRateOfClockDateChange = state => state.rateOfClockDateChange

export const getCurrentTime = state => getLocalTime(state, getClockDate(state))

// get the day of the year, between 1 and 365 or 366
const getDayOfYear = date => {
  var startOfYear = new Date(date.getFullYear(), 0, 0)
  var diff =
    date -
    startOfYear +
    (startOfYear.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000

  var oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

const getTotalSecondsInDay = () => 24 * 60 * 60

// Amount of seconds it takes for sunrise or sunset to occur.
// Hardcoded 10 minutes here as the amount of time it takes for a "sun change"
// (sunrise or sunset) to occur. In reality, sunrise and sunset can take much
// longer. TODO Would be great to show the actual gap of how long it takes!
const getSunChangeSeconds = () => 10 * 60

const getSunChangeTransitionDegrees = () =>
  getSunChangeSeconds() / getTotalSecondsInDay() * 360

const getElapsedSecondsBeforeTime = time => time.get(ChronoField.SECOND_OF_DAY)

const getSunsetSecondsOfDay = state =>
  getElapsedSecondsBeforeTime(getSunsetTime(state))

const getSunriseSecondsOfDay = state =>
  getElapsedSecondsBeforeTime(getSunriseTime(state))

export const getIsDaytime = state => {
  const now = getElapsedSecondsBeforeTime(LocalTime.now())
  return (
    now < getSunsetSecondsOfDay(state) && now > getSunriseSecondsOfDay(state)
  )
}

export const getDaylightSeconds = state => {
  if (is24HourDaylight(state)) return getTotalSecondsInDay()
  if (is24HourNighttime(state)) return 0

  const daylightSeconds =
    getSunsetSecondsOfDay(state) - getSunriseSecondsOfDay(state)

  return daylightSeconds < 0
    ? // if the sunset is an earlier time than the sunrise,
      // (i.e. sun rises at 3 am and sets at 2am), then
      // add 24 hours to account for that
      daylightSeconds + getTotalSecondsInDay()
    : daylightSeconds
}

const getProportionDayToNight = state =>
  getDaylightSeconds(state) / getTotalSecondsInDay()

// calculates relative to noon at top of circle (0 degrees)
const getAngleForTime = time =>
  standardizeAngle(
    getElapsedSecondsBeforeTime(time) / getTotalSecondsInDay() * 360 + 180
  )

const isNorthernHemisphere = state => getSelectedLocation(state).latitude > 0

export const sunIsNotRisingOrSetting = state =>
  getSunriseDate(state).valueOf() === getSunsetDate(state).valueOf()

const springEquinoxElapsedDays = getDayOfYear(new Date(2000, 2, 21))
const autumnEquinoxElapsedDays = getDayOfYear(new Date(2000, 8, 21))

const isSunAboveEquator = state => {
  const clockDate = getClockDate(state)
  const elapsedDays = getDayOfYear(clockDate)

  return (
    elapsedDays >= springEquinoxElapsedDays &&
    elapsedDays <= autumnEquinoxElapsedDays
  )
}

export const is24HourDaylight = state =>
  sunIsNotRisingOrSetting(state) &&
  ((isNorthernHemisphere(state) && isSunAboveEquator(state)) ||
    (!isNorthernHemisphere(state) && !isSunAboveEquator(state)))

export const getSunriseAngle = state => getAngleForTime(getSunriseTime(state))

export const getSunsetAngle = state => getAngleForTime(getSunsetTime(state))

export const getDaylightStartAngle = state =>
  is24HourDaylight(state)
    ? 0
    : getSunriseAngle(state) + getSunChangeTransitionDegrees() / 2

export const getDaylightEndAngle = state =>
  is24HourDaylight(state)
    ? 359.9999
    : getSunsetAngle(state) - getSunChangeTransitionDegrees() / 2

export const is24HourNighttime = state =>
  sunIsNotRisingOrSetting(state) &&
  ((isNorthernHemisphere(state) && !isSunAboveEquator(state)) ||
    (!isNorthernHemisphere(state) && isSunAboveEquator(state)))

export const getNighttimeStartAngle = state =>
  is24HourNighttime(state)
    ? 0
    : getSunsetAngle(state) + getSunChangeTransitionDegrees() / 2

export const getNighttimeEndAngle = state =>
  is24HourNighttime(state)
    ? 359.9999
    : getSunriseAngle(state) - getSunChangeTransitionDegrees() / 2

const getAngleForTimeRadians = time => getAngleForTime(time) * (Math.PI / 180)

// For a given time on the circle, these getters get the horizontal and
// vertical parts of the change necessary to get to that time's position
// on the circle.
// Does not take radius into account, in order to allow for different
// circles (i.e. inner clock radius, hour marker inner radius, hour marker
// text radius, etc.)
// Vertical aspect is modified by -1 because svg is y-down (y increases as
// you move down).
export const getVerticalAspectOfTime = time =>
  -1 * Math.cos(getAngleForTimeRadians(time))

export const getHorizontalAspectOfTime = time =>
  Math.sin(getAngleForTimeRadians(time))

const getAngleForDate = date =>
  standardizeAngle(getDayOfYear(date) / 365 * 360 + 190)

const getAngleForDateRadians = date => getAngleForDate(date) * (Math.PI / 180)

// For a given date on the circle, these getters get the horizontal and
// vertical parts of the change necessary to get to that date's position
// on the circle.
export const getVerticalAspectOfDate = date =>
  -1 * Math.cos(getAngleForDateRadians(date))

export const getHorizontalAspectOfDate = date =>
  Math.sin(getAngleForDateRadians(date))

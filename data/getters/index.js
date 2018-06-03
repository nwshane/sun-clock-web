import { ChronoField, LocalTime } from 'js-joda'

import standardizeAngle from '../standardizeAngle'
import { localizeDate, getLocalTime } from '../localize'

export const getSunriseDate = state => state.sunriseDate
export const getSunsetDate = state => state.sunsetDate

export const getSunriseTime = state =>
  getLocalTime(state, getSunriseDate(state))
export const getSunsetTime = state => getLocalTime(state, getSunsetDate(state))

export const getClockDate = state => state.clockDate
export const getLocalClockDate = state =>
  localizeDate(state, getClockDate(state))

export const getRateOfClockDateChange = state => state.rateOfClockDateChange

export const getCurrentTime = state => getLocalTime(state, getClockDate(state))

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

export const getDaylightSeconds = state =>
  getSunsetSecondsOfDay(state) - getSunriseSecondsOfDay(state)

const getProportionDayToNight = state =>
  getDaylightSeconds(state) / getTotalSecondsInDay()

// calculates relative to noon at top of circle (0 degrees)
const getAngleForTime = time =>
  standardizeAngle(
    getElapsedSecondsBeforeTime(time) / getTotalSecondsInDay() * 360 + 180
  )

export const getSunriseAngle = state => getAngleForTime(getSunriseTime(state))

export const getSunsetAngle = state => getAngleForTime(getSunsetTime(state))

export const getDaylightStartAngle = state =>
  getSunriseAngle(state) + getSunChangeTransitionDegrees() / 2

export const getDaylightEndAngle = state =>
  getSunsetAngle(state) - getSunChangeTransitionDegrees() / 2

export const getNighttimeStartAngle = state =>
  getSunsetAngle(state) + getSunChangeTransitionDegrees() / 2

export const getNighttimeEndAngle = state =>
  getSunriseAngle(state) - getSunChangeTransitionDegrees() / 2

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

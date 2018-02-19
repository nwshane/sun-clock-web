import { ChronoField } from 'js-joda'

import standardizeAngle from '../standardizeAngle'
import dateToLocalTime from '../dateToLocalTime'

const getSunriseDate = state => state.sunriseDate
const getSunsetDate = state => state.sunsetDate

export const getSunriseTime = state => dateToLocalTime(getSunriseDate(state))
export const getSunsetTime = state => dateToLocalTime(getSunsetDate(state))

export const getClockDate = state => state.clockDate

export const getCurrentTime = state => dateToLocalTime(getClockDate(state))

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

const getDaylightSeconds = state =>
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

export const getDimension = state => state.dimension
export const getCenterX = state => getDimension(state) / 2
export const getCenterY = state => getDimension(state) / 2

// represents radius of circle halfway between inner and outer clock circles
export const getRadius = state => getDimension(state) / 2.6

export const getArcWidth = state => getRadius(state) / 4

export const getClockInnerRadius = state =>
  getRadius(state) - getArcWidth(state) / 2

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

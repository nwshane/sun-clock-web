import standardizeAngle from './standardizeAngle'
import { ChronoField } from 'js-joda'

export const getLocalSunriseTime = state => state.sunriseLocalTime
export const getLocalSunsetTime = state => state.sunsetLocalTime
export const getCurrentTime = state => state.currentTime

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
  getElapsedSecondsBeforeTime(getLocalSunsetTime(state))

const getSunriseSecondsOfDay = state =>
  getElapsedSecondsBeforeTime(getLocalSunriseTime(state))

const getDaylightSeconds = state =>
  getSunsetSecondsOfDay(state) - getSunriseSecondsOfDay(state)

const getProportionDayToNight = state =>
  getDaylightSeconds(state) / getTotalSecondsInDay()

// calculates relative to noon at top of circle (0 degrees)
const getAngleForTime = time =>
  standardizeAngle(
    getElapsedSecondsBeforeTime(time) / getTotalSecondsInDay() * 360 + 180
  )

export const getSunriseAngle = state =>
  getAngleForTime(getLocalSunriseTime(state))

export const getSunsetAngle = state =>
  getAngleForTime(getLocalSunsetTime(state))

export const getDaylightStartAngle = state =>
  getSunriseAngle(state) + getSunChangeTransitionDegrees() / 2

export const getDaylightEndAngle = state =>
  getSunsetAngle(state) - getSunChangeTransitionDegrees() / 2

export const getNighttimeStartAngle = state =>
  getSunsetAngle(state) + getSunChangeTransitionDegrees() / 2

export const getNighttimeEndAngle = state =>
  getSunriseAngle(state) - getSunChangeTransitionDegrees() / 2

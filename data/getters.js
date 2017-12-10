import standardizeAngle from './standardizeAngle'
import { ChronoField } from 'js-joda'

export const getLocalSunriseTime = state => state.sunriseLocalTime
export const getLocalSunsetTime = state => state.sunsetLocalTime
export const getCurrentTime = state => state.currentTime

const getTotalSecondsInDay = () => 24 * 60 * 60

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

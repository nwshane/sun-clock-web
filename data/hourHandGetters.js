import {
  getCenterX,
  getCenterY,
  getHorizontalAspectOfTime,
  getVerticalAspectOfTime,
  getClockInnerRadius,
  SUN_CLOCK_CIRCLE_DIMENSION,
  getCurrentTime
} from './getters'

const getHourHandXModifier = state =>
  getHorizontalAspectOfTime(getCurrentTime(state)) *
  getClockInnerRadius(state) *
  0.9

const getHourHandYModifier = state =>
  getVerticalAspectOfTime(getCurrentTime(state)) *
  getClockInnerRadius(state) *
  0.9

export const getHourHandX1 = state => {
  return getCenterX(state)
}

export const getHourHandY1 = state => getCenterY(state)

export const getHourHandX2 = state =>
  getCenterX(state) + getHourHandXModifier(state)

export const getHourHandY2 = state =>
  getCenterY(state) + getHourHandYModifier(state)

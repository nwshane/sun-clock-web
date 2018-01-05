import {
  getCenterX,
  getCenterY,
  getHorizontalAspectOfTime,
  getVerticalAspectOfTime,
  getClockInnerRadius,
  getDimension,
  getCurrentTime
} from './getters'

const getHourHandXModifier = state =>
  getHorizontalAspectOfTime(getCurrentTime(state)) *
  getClockInnerRadius(getDimension(state)) *
  0.9

const getHourHandYModifier = state =>
  getVerticalAspectOfTime(getCurrentTime(state)) *
  getClockInnerRadius(getDimension(state)) *
  0.9

export const getHourHandX1 = state => getCenterX(getDimension(state))
export const getHourHandY1 = state => getCenterY(getDimension(state))

export const getHourHandX2 = state =>
  getCenterX(getDimension(state)) + getHourHandXModifier(state)

export const getHourHandY2 = state =>
  getCenterY(getDimension(state)) + getHourHandYModifier(state)

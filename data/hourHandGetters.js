import {
  getCenterX,
  getCenterY,
  getHorizontalAspectOfTime,
  getVerticalAspectOfTime,
  getClockInnerRadius
} from './getters'

const getHourHandXModifier = ({ dimension, time }) =>
  getHorizontalAspectOfTime(time) * getClockInnerRadius(dimension) * 0.9

const getHourHandYModifier = ({ dimension, time }) =>
  getVerticalAspectOfTime(time) * getClockInnerRadius(dimension) * 0.9

export const getHourHandX1 = ({ dimension }) => getCenterX(dimension)
export const getHourHandY1 = ({ dimension }) => getCenterY(dimension)

export const getHourHandX2 = ({ dimension, time }) =>
  getCenterX(dimension) + getHourHandXModifier({ dimension, time })

export const getHourHandY2 = ({ dimension, time }) =>
  getCenterY(dimension) + getHourHandYModifier({ dimension, time })

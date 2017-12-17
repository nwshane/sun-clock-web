// Useful explanation of the trigonometry in this file:
// https://www.mathsisfun.com/sine-cosine-tangent.html

import {
  getCenterX,
  getCenterY,
  getClockInnerRadius,
  getAngleForTime
} from './getters'

const getAngleForTimeRadians = time => getAngleForTime(time) * (Math.PI / 180)

const getMarkerInnerRadius = dimension => getClockInnerRadius(dimension) / 1.05

const getLineOuterXModifier = ({ dimension, time }) =>
  Math.sin(getAngleForTimeRadians(time)) * getClockInnerRadius(dimension)

const getLineInnerXModifier = ({ dimension, time }) =>
  Math.sin(getAngleForTimeRadians(time)) * getMarkerInnerRadius(dimension)

export const getLineOuterX = ({ dimension, time }) =>
  getCenterX(dimension) + getLineOuterXModifier({ dimension, time })

export const getLineInnerX = ({ dimension, time }) =>
  getCenterX(dimension) + getLineInnerXModifier({ dimension, time })

const getLineOuterYModifier = ({ dimension, time }) =>
  -1 * Math.cos(getAngleForTimeRadians(time)) * getClockInnerRadius(dimension)

const getLineInnerYModifier = ({ dimension, time }) =>
  -1 * Math.cos(getAngleForTimeRadians(time)) * getMarkerInnerRadius(dimension)

export const getLineOuterY = ({ dimension, time }) =>
  getCenterY(dimension) + getLineOuterYModifier({ dimension, time })

export const getLineInnerY = ({ dimension, time }) =>
  getCenterY(dimension) + getLineInnerYModifier({ dimension, time })

const getTextXModifier = ({ dimension, time }) =>
  Math.sin(getAngleForTimeRadians(time)) *
  getMarkerInnerRadius(dimension) *
  0.87

export const getTextX = ({ dimension, time }) =>
  getCenterX(dimension) + getTextXModifier({ dimension, time })

const getTextYModifier = ({ dimension, time }) =>
  -1 *
  Math.cos(getAngleForTimeRadians(time)) *
  getMarkerInnerRadius(dimension) *
  0.94

export const getTextY = ({ dimension, time }) =>
  getCenterY(dimension) + getTextYModifier({ dimension, time })

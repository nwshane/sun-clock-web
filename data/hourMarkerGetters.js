// Useful explanation of the trigonometry in this file:
// https://www.mathsisfun.com/sine-cosine-tangent.html

import {
  getCenterX,
  getCenterY,
  getClockInnerRadius,
  getHorizontalAspectOfTime,
  getVerticalAspectOfTime
} from './getters'

const getMarkerInnerRadius = dimension => getClockInnerRadius(dimension) / 1.05

const getLineOuterXModifier = ({ dimension, time }) =>
  getHorizontalAspectOfTime(time) * getClockInnerRadius(dimension)

const getLineInnerXModifier = ({ dimension, time }) =>
  getHorizontalAspectOfTime(time) * getMarkerInnerRadius(dimension)

const getLineOuterYModifier = ({ dimension, time }) =>
  getVerticalAspectOfTime(time) * getClockInnerRadius(dimension)

const getLineInnerYModifier = ({ dimension, time }) =>
  getVerticalAspectOfTime(time) * getMarkerInnerRadius(dimension)

const getTextXModifier = ({ dimension, time }) =>
  getHorizontalAspectOfTime(time) * getMarkerInnerRadius(dimension) * 0.87

const getTextYModifier = ({ dimension, time }) =>
  getVerticalAspectOfTime(time) * getMarkerInnerRadius(dimension) * 0.94

export const getLineOuterX = ({ dimension, time }) =>
  getCenterX(dimension) + getLineOuterXModifier({ dimension, time })

export const getLineInnerX = ({ dimension, time }) =>
  getCenterX(dimension) + getLineInnerXModifier({ dimension, time })

export const getLineOuterY = ({ dimension, time }) =>
  getCenterY(dimension) + getLineOuterYModifier({ dimension, time })

export const getLineInnerY = ({ dimension, time }) =>
  getCenterY(dimension) + getLineInnerYModifier({ dimension, time })

export const getTextX = ({ dimension, time }) =>
  getCenterX(dimension) + getTextXModifier({ dimension, time })

export const getTextY = ({ dimension, time }) =>
  getCenterY(dimension) + getTextYModifier({ dimension, time })

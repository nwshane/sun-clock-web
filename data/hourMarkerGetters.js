// Useful explanation of the trigonometry in this file:
// https://www.mathsisfun.com/sine-cosine-tangent.html

import {
  getCenterX,
  getCenterY,
  getClockInnerRadius,
  getHorizontalAspectOfTime,
  getVerticalAspectOfTime
} from './getters'

const getMarkerInnerRadius = state => getClockInnerRadius(state) / 1.05

const getLineOuterXModifier = (state, time) =>
  getHorizontalAspectOfTime(time) * getClockInnerRadius(state)

const getLineInnerXModifier = (state, time) =>
  getHorizontalAspectOfTime(time) * getMarkerInnerRadius(state)

const getLineOuterYModifier = (state, time) =>
  getVerticalAspectOfTime(time) * getClockInnerRadius(state)

const getLineInnerYModifier = (state, time) =>
  getVerticalAspectOfTime(time) * getMarkerInnerRadius(state)

const getTextXModifier = (state, time) =>
  getHorizontalAspectOfTime(time) * getMarkerInnerRadius(state) * 0.87

const getTextYModifier = (state, time) =>
  getVerticalAspectOfTime(time) * getMarkerInnerRadius(state) * 0.94

export const getLineOuterX = (state, time) =>
  getCenterX(state) + getLineOuterXModifier(state, time)

export const getLineInnerX = (state, time) =>
  getCenterX(state) + getLineInnerXModifier(state, time)

export const getLineOuterY = (state, time) =>
  getCenterY(state) + getLineOuterYModifier(state, time)

export const getLineInnerY = (state, time) =>
  getCenterY(state) + getLineInnerYModifier(state, time)

export const getTextX = (state, time) =>
  getCenterX(state) + getTextXModifier(state, time)

export const getTextY = (state, time) =>
  getCenterY(state) + getTextYModifier(state, time)

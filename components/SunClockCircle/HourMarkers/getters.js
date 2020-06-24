// Useful explanation of the trigonometry in this file:
// https://www.mathsisfun.com/sine-cosine-tangent.html

import {
  SUN_CLOCK_CENTER_X,
  SUN_CLOCK_CENTER_Y,
  SUN_CLOCK_CIRCLE_INNER_RADIUS,
} from '~/data/constants'

import {
  getHorizontalAspectOfTime,
  getVerticalAspectOfTime,
} from '~/data/getters'

const getMarkerInnerRadius = (state) => SUN_CLOCK_CIRCLE_INNER_RADIUS / 1.05

const getLineOuterXModifier = (state, time) =>
  getHorizontalAspectOfTime(time) * SUN_CLOCK_CIRCLE_INNER_RADIUS

const getLineInnerXModifier = (state, time) =>
  getHorizontalAspectOfTime(time) * getMarkerInnerRadius(state)

const getLineOuterYModifier = (state, time) =>
  getVerticalAspectOfTime(time) * SUN_CLOCK_CIRCLE_INNER_RADIUS

const getLineInnerYModifier = (state, time) =>
  getVerticalAspectOfTime(time) * getMarkerInnerRadius(state)

const getTextXModifier = (state, time) =>
  getHorizontalAspectOfTime(time) * getMarkerInnerRadius(state) * 0.85

const getTextYModifier = (state, time) =>
  getVerticalAspectOfTime(time) * getMarkerInnerRadius(state) * 0.94

export const getLineOuterX = (state, time) =>
  SUN_CLOCK_CENTER_X + getLineOuterXModifier(state, time)

export const getLineInnerX = (state, time) =>
  SUN_CLOCK_CENTER_X + getLineInnerXModifier(state, time)

export const getLineOuterY = (state, time) =>
  SUN_CLOCK_CENTER_Y + getLineOuterYModifier(state, time)

export const getLineInnerY = (state, time) =>
  SUN_CLOCK_CENTER_Y + getLineInnerYModifier(state, time)

export const getTextX = (state, time) =>
  SUN_CLOCK_CENTER_X + getTextXModifier(state, time)

export const getTextY = (state, time) =>
  SUN_CLOCK_CENTER_Y + getTextYModifier(state, time)

// Useful explanation of the trigonometry in this file:
// https://www.mathsisfun.com/sine-cosine-tangent.html

import {
  SUN_CLOCK_CENTER_X,
  SUN_CLOCK_CENTER_Y,
  SUN_CLOCK_CIRCLE_INNER_RADIUS,
} from '~/data/constants'

import {
  getHorizontalAspectOfDate,
  getVerticalAspectOfDate,
} from '~/data/getters'

const getMarkerInnerRadius = (state) => SUN_CLOCK_CIRCLE_INNER_RADIUS / 1.05

const getLineOuterXModifier = (state, date) =>
  getHorizontalAspectOfDate(date) * SUN_CLOCK_CIRCLE_INNER_RADIUS

const getLineInnerXModifier = (state, date) =>
  getHorizontalAspectOfDate(date) * getMarkerInnerRadius(state)

const getLineOuterYModifier = (state, date) =>
  getVerticalAspectOfDate(date) * SUN_CLOCK_CIRCLE_INNER_RADIUS

const getLineInnerYModifier = (state, date) =>
  getVerticalAspectOfDate(date) * getMarkerInnerRadius(state)

const getTextXModifier = (state, date) =>
  getHorizontalAspectOfDate(date) * getMarkerInnerRadius(state) * 0.8

const getTextYModifier = (state, date) =>
  getVerticalAspectOfDate(date) * getMarkerInnerRadius(state) * 0.94

export const getLineOuterX = (state, date) =>
  SUN_CLOCK_CENTER_X + getLineOuterXModifier(state, date)

export const getLineInnerX = (state, date) =>
  SUN_CLOCK_CENTER_X + getLineInnerXModifier(state, date)

export const getLineOuterY = (state, date) =>
  SUN_CLOCK_CENTER_Y + getLineOuterYModifier(state, date)

export const getLineInnerY = (state, date) =>
  SUN_CLOCK_CENTER_Y + getLineInnerYModifier(state, date)

export const getTextX = (state, date) =>
  SUN_CLOCK_CENTER_X + getTextXModifier(state, date)

export const getTextY = (state, date) =>
  SUN_CLOCK_CENTER_Y + getTextYModifier(state, date)

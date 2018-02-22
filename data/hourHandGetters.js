import {
  SUN_CLOCK_CIRCLE_DIMENSION,
  SUN_CLOCK_CIRCLE_INNER_RADIUS,
  SUN_CLOCK_CENTER_X,
  SUN_CLOCK_CENTER_Y
} from '~/data/constants'

import {
  getHorizontalAspectOfTime,
  getVerticalAspectOfTime,
  getCurrentTime
} from './getters'

const getHourHandXModifier = state =>
  getHorizontalAspectOfTime(getCurrentTime(state)) *
  SUN_CLOCK_CIRCLE_INNER_RADIUS *
  0.9

const getHourHandYModifier = state =>
  getVerticalAspectOfTime(getCurrentTime(state)) *
  SUN_CLOCK_CIRCLE_INNER_RADIUS *
  0.9

export const getHourHandX1 = state => {
  return SUN_CLOCK_CENTER_X
}

export const getHourHandY1 = state => SUN_CLOCK_CENTER_Y

export const getHourHandX2 = state =>
  SUN_CLOCK_CENTER_X + getHourHandXModifier(state)

export const getHourHandY2 = state =>
  SUN_CLOCK_CENTER_Y + getHourHandYModifier(state)

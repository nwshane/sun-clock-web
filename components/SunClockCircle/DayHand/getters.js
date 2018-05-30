import {
  SUN_CLOCK_CIRCLE_DIMENSION,
  SUN_CLOCK_CIRCLE_INNER_RADIUS,
  SUN_CLOCK_CENTER_X,
  SUN_CLOCK_CENTER_Y
} from '~/data/constants'

import {
  getHorizontalAspectOfDate,
  getVerticalAspectOfDate,
  getLocalClockDate
} from '~/data/getters'

const getDayHandXModifier = state =>
  getHorizontalAspectOfDate(getLocalClockDate(state)) *
  SUN_CLOCK_CIRCLE_INNER_RADIUS *
  0.9

const getDayHandYModifier = state =>
  getVerticalAspectOfDate(getLocalClockDate(state)) *
  SUN_CLOCK_CIRCLE_INNER_RADIUS *
  0.9

export const getDayHandX1 = state => {
  return SUN_CLOCK_CENTER_X
}

export const getDayHandY1 = state => SUN_CLOCK_CENTER_Y

export const getDayHandX2 = state =>
  SUN_CLOCK_CENTER_X + getDayHandXModifier(state)

export const getDayHandY2 = state =>
  SUN_CLOCK_CENTER_Y + getDayHandYModifier(state)

export const SUN_CLOCK_CIRCLE_DIMENSION = 600
export const SUN_CLOCK_CENTER_X = SUN_CLOCK_CIRCLE_DIMENSION / 2
export const SUN_CLOCK_CENTER_Y = SUN_CLOCK_CIRCLE_DIMENSION / 2

// represents radius of circle halfway between inner and outer clock circles
export const SUN_CLOCK_RADIUS = SUN_CLOCK_CIRCLE_DIMENSION / 2.6

export const SUN_CLOCK_ARC_WIDTH = SUN_CLOCK_RADIUS / 4

export const SUN_CLOCK_CIRCLE_INNER_RADIUS =
  SUN_CLOCK_RADIUS - SUN_CLOCK_ARC_WIDTH / 2

// the lowest speed (inclusive) at which the sun clock circle is treated as
// a year (i.e. using day markers instead of hour markers)
export const YEAR_CIRCLE_MIN_SPEED = 500000

export const DAYLIGHT_ARC_COLOR = '#ffe41e'
export const NIGHTTIME_ARC_COLOR = 'black'
export const HOVER_LINK_COLOR = '#246A73'

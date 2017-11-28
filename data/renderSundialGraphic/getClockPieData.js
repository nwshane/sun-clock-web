import { pie } from 'd3-shape'
import {
  getDaylightMilliseconds,
  getNighttimeMilliseconds
} from './daylightNighttime'

const daylightColor = '#ffe41e'
const nighttimeColor = '#000'

// Prepares sunrise and sunset times for use in a circle, adding
// properties like "startAngle" and "endAngle"
export default ({ sunrise, sunset }) =>
  pie().value(d => d.time)([
    { color: daylightColor, time: getDaylightMilliseconds(sunrise, sunset) },
    { color: nighttimeColor, time: getNighttimeMilliseconds(sunrise, sunset) }
  ])

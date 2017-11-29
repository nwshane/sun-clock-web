import moment from 'moment'
import { pie } from 'd3-shape'
import {
  getProportionOfDayBetween,
  getDaylightMilliseconds,
  getNighttimeMilliseconds
} from './timeHelpers'

const daylightColor = '#ffe41e'
const nighttimeColor = '#000'

const getTimeLengthData = ({ sunrise, sunset }) => [
  {
    key: 'day',
    color: daylightColor,
    time: getDaylightMilliseconds(sunrise, sunset)
  },
  {
    key: 'night',
    color: nighttimeColor,
    time: getNighttimeMilliseconds(sunrise, sunset)
  }
]

// Rotates the clock so that the current time is at the top of the circle
const getOffsetAngleForCurrentTime = ({ currentTime, sunrise }) =>
  2 * Math.PI * getProportionOfDayBetween(currentTime, sunrise)

const pieDataPreparer = offsetAngle =>
  pie()
    .value(d => d.time)
    .startAngle(offsetAngle)
    // By default, d3 sorts pie data by putting the arc with the bigger value
    // first. This overrides default sort so that daytime always comes first.
    .sort(d => (d.key === 'day' ? -1 : 1))
    .endAngle(2 * Math.PI + offsetAngle)

// Prepares sunrise and sunset times for use in a circle, setting properties
// like "startAngle" and "endAngle" that are used by d3's arc shape.
export default state =>
  pieDataPreparer(getOffsetAngleForCurrentTime(state))(getTimeLengthData(state))
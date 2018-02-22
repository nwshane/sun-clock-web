import { connect } from 'react-redux'
import Arc from './Arc'
import {
  SUN_CLOCK_CIRCLE_DIMENSION,
  getDaylightStartAngle,
  getDaylightEndAngle,
  getRadius,
  getArcWidth,
  getCenterX,
  getCenterY
} from '../../data/getters'

const mapStateToProps = state => ({
  dimension: SUN_CLOCK_CIRCLE_DIMENSION,
  startAngle: getDaylightStartAngle(state),
  endAngle: getDaylightEndAngle(state),
  color: '#ffe41e',
  radius: getRadius(state),
  arcWidth: getArcWidth(state),
  centerX: getCenterX(state),
  centerY: getCenterY(state)
})

export default connect(mapStateToProps)(Arc)

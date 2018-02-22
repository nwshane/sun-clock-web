import { connect } from 'react-redux'
import Arc from './Arc'

import {
  SUN_CLOCK_CIRCLE_DIMENSION,
  SUN_CLOCK_RADIUS,
  SUN_CLOCK_ARC_WIDTH,
  SUN_CLOCK_CENTER_X,
  SUN_CLOCK_CENTER_Y
} from '~/data/constants'

import { getDaylightStartAngle, getDaylightEndAngle } from '../../data/getters'

const mapStateToProps = state => ({
  dimension: SUN_CLOCK_CIRCLE_DIMENSION,
  startAngle: getDaylightStartAngle(state),
  endAngle: getDaylightEndAngle(state),
  color: '#ffe41e',
  radius: SUN_CLOCK_RADIUS,
  arcWidth: SUN_CLOCK_ARC_WIDTH,
  centerX: SUN_CLOCK_CENTER_X,
  centerY: SUN_CLOCK_CENTER_Y
})

export default connect(mapStateToProps)(Arc)

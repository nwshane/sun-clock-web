import { connect } from 'react-redux'
import Arc from '~/components/shared/Arc'

import {
  SUN_CLOCK_CIRCLE_DIMENSION,
  SUN_CLOCK_RADIUS,
  SUN_CLOCK_ARC_WIDTH,
  SUN_CLOCK_CENTER_X,
  SUN_CLOCK_CENTER_Y,
  NIGHTTIME_ARC_COLOR,
} from '~/data/constants'

import {
  getNighttimeStartAngle,
  getNighttimeEndAngle,
  is24HourDaylight,
} from '../../data/getters'

const mapStateToProps = (state) => ({
  dimension: SUN_CLOCK_CIRCLE_DIMENSION,
  color: NIGHTTIME_ARC_COLOR,
  radius: SUN_CLOCK_RADIUS,
  arcWidth: SUN_CLOCK_ARC_WIDTH,
  centerX: SUN_CLOCK_CENTER_X,
  centerY: SUN_CLOCK_CENTER_Y,
  startAngle: getNighttimeStartAngle(state),
  endAngle: getNighttimeEndAngle(state),
  shouldRender: !is24HourDaylight(state),
})

export default connect(mapStateToProps)(Arc)

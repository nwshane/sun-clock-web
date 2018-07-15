import { connect } from 'react-redux'
import {
  SUN_CLOCK_CIRCLE_DIMENSION,
  YEAR_CIRCLE_MIN_SPEED
} from '~/data/constants'

import DaylightArc from './DaylightArc'
import NighttimeArc from './NighttimeArc'
import HourMarkers from './HourMarkers'
import HourHand from './HourHand'
import SunIcon from './SunIcon'
import {
  getRateOfClockDateChange,
  is24HourDaylight,
  is24HourNighttime
} from '~/data/getters'
import DayMarkers from './DayMarkers'
import DayHand from './DayHand'

class SunClockCircle extends React.Component {
  render() {
    const {
      is24HourDaylight,
      is24HourNighttime,
      rateOfClockDateChange
    } = this.props

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SUN_CLOCK_CIRCLE_DIMENSION} ${
          SUN_CLOCK_CIRCLE_DIMENSION
        }`}
      >
        {/* SunIcon must go after DaylightArc so that it is on top, and before
            NighttimeArc so that it is below. */}
        {is24HourNighttime ? null : <DaylightArc />}

        {rateOfClockDateChange < YEAR_CIRCLE_MIN_SPEED
          ? [
              <HourHand key="HourHand" />,
              <SunIcon key="SunIcon" />,
              <HourMarkers key="HourMarkers" />
            ]
          : [<DayMarkers key="DayMarkers" />, <DayHand key="DayHand" />]}
        {is24HourDaylight ? null : <NighttimeArc />}
      </svg>
    )
  }
}

export default connect(state => ({
  is24HourDaylight: is24HourDaylight(state),
  is24HourNighttime: is24HourNighttime(state),
  rateOfClockDateChange: getRateOfClockDateChange(state)
}))(SunClockCircle)

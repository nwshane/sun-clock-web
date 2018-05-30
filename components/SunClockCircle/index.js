import { connect } from 'react-redux'
import { SUN_CLOCK_CIRCLE_DIMENSION } from '~/data/constants'

import DaylightArc from './DaylightArc'
import NighttimeArc from './NighttimeArc'
import HourMarkers from './HourMarkers'
import HourHand from './HourHand'
import SunIcon from './SunIcon'
import { getRateOfClockDateChange } from '~/data/getters'

class SunClockCircle extends React.Component {
  render() {
    const { rateOfClockDateChange } = this.props

    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SUN_CLOCK_CIRCLE_DIMENSION} ${
          SUN_CLOCK_CIRCLE_DIMENSION
        }`}
      >
        <DaylightArc />
        <NighttimeArc />
        {rateOfClockDateChange < 100000
          ? [
              <HourHand key="HourHand" />,
              <SunIcon key="SunIcon" />,
              <HourMarkers key="HourMarkers" />
            ]
          : []}
      </svg>
    )
  }
}

export default connect(state => ({
  rateOfClockDateChange: getRateOfClockDateChange(state)
}))(SunClockCircle)

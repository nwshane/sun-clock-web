import { SUN_CLOCK_CIRCLE_DIMENSION } from '~/data/constants'

import DaylightArc from './DaylightArc'
import NighttimeArc from './NighttimeArc'
import HourMarkers from '~/components/shared/HourMarkers'
import HourHand from './HourHand'
import SunIcon from './SunIcon'

class SunClockCircle extends React.Component {
  render() {
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
        <HourHand />
        <SunIcon />
        <HourMarkers />
      </svg>
    )
  }
}

export default SunClockCircle

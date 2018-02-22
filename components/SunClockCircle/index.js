import { SUN_CLOCK_CIRCLE_DIMENSION } from '~/data/constants'

import DaylightArc from './DaylightArc'
import NighttimeArc from './NighttimeArc'
import HourMarkers from './HourMarkers'
import HourHand from './HourHand'
import SunIcon from './SunIcon'

class TriangleMarker extends React.Component {
  render() {
    return (
      <marker
        id="triangle"
        viewBox="0 0 10 10"
        refX="1"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    )
  }
}

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
        <defs>
          <TriangleMarker />
        </defs>
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

import DaylightArc from './DaylightArc'
import NighttimeArc from './NighttimeArc'
import HourMarkers from './HourMarkers'
import HourHand from './HourHand'

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

class SunClockCirclePresentation extends React.Component {
  render() {
    const { dimension } = this.props

    return (
      <svg width={`${dimension}px`} height={`${dimension}px`}>
        <defs>
          <TriangleMarker />
        </defs>
        <DaylightArc {...this.props} />
        <NighttimeArc {...this.props} />
        <HourHand {...this.props} />
        <HourMarkers {...this.props} />
      </svg>
    )
  }
}

export default SunClockCirclePresentation

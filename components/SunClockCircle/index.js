import { connect } from 'react-redux'

import { getDimension } from '../../data/getters'

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
    const { dimension } = this.props

    return (
      <svg
        width={`${dimension}px`}
        height={`${dimension}px`}
        viewBox={`0 0 ${dimension} ${dimension}`}
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

const mapStateToProps = state => ({
  dimension: getDimension(state)
})

export default connect(mapStateToProps)(SunClockCircle)

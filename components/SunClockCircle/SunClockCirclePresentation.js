import DaylightArc from './DaylightArc'
import NighttimeArc from './NighttimeArc'
import HourMarkers from './HourMarkers'

class SunClockCirclePresentation extends React.Component {
  render() {
    const { dimension } = this.props

    return (
      <svg width={`${dimension}px`} height={`${dimension}px`}>
        <DaylightArc {...this.props} />
        <NighttimeArc {...this.props} />
        <HourMarkers {...this.props} />
      </svg>
    )
  }
}

export default SunClockCirclePresentation

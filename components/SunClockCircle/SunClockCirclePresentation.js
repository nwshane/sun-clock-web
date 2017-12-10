import DaylightArc from './DaylightArc'
import NighttimeArc from './NighttimeArc'

class SunClockCirclePresentation extends React.Component {
  render() {
    const { dimension } = this.props

    return (
      <svg width={`${dimension}px`} height={`${dimension}px`}>
        <DaylightArc {...this.props} />
        <NighttimeArc {...this.props} />
      </svg>
    )
  }
}

export default SunClockCirclePresentation

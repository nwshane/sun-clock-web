import Arc from './Arc'
import { getDaylightStartAngle, getDaylightEndAngle } from '../../data/getters'

class DaylightArc extends React.Component {
  render() {
    const { dimension } = this.props

    return (
      <Arc
        dimension={dimension}
        startAngle={getDaylightStartAngle(this.props)}
        endAngle={getDaylightEndAngle(this.props)}
        color="#ffe41e"
      />
    )
  }
}

export default DaylightArc

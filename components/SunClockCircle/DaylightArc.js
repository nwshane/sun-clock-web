import Arc from './Arc'
import { getSunriseAngle, getSunsetAngle } from '../../data/getters'

class DaylightArc extends React.Component {
  render() {
    const { dimension } = this.props

    return (
      <Arc
        dimension={dimension}
        startAngle={getSunriseAngle(this.props)}
        endAngle={getSunsetAngle(this.props)}
        color="#ffe41e"
      />
    )
  }
}

export default DaylightArc

import Arc from './Arc'
import { getSunriseAngle, getSunsetAngle } from '../../data/getters'

class NighttimeArc extends React.Component {
  render() {
    const { dimension } = this.props

    return (
      <Arc
        dimension={dimension}
        startAngle={getSunsetAngle(this.props)}
        endAngle={getSunriseAngle(this.props)}
        color="black"
      />
    )
  }
}

export default NighttimeArc

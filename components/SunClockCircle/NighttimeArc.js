import Arc from './Arc'

import {
  getNighttimeStartAngle,
  getNighttimeEndAngle
} from '../../data/getters'

class NighttimeArc extends React.Component {
  render() {
    const { dimension } = this.props

    return (
      <Arc
        dimension={dimension}
        startAngle={getNighttimeStartAngle(this.props)}
        endAngle={getNighttimeEndAngle(this.props)}
        color="black"
      />
    )
  }
}

export default NighttimeArc

import {
  getHourHandX1,
  getHourHandY1,
  getHourHandX2,
  getHourHandY2
} from '../../data/hourHandGetters'

import { getCurrentTime } from '../../data/getters'

class HourHand extends React.Component {
  render() {
    return (
      <line
        x1={getHourHandX1(this.props)}
        y1={getHourHandY1(this.props)}
        x2={getHourHandX2(this.props)}
        y2={getHourHandY2(this.props)}
        strokeWidth={2}
        stroke="black"
        markerEnd="url(#triangle)"
      />
    )
  }
}

export default HourHand

import {
  getHourHandX1,
  getHourHandY1,
  getHourHandX2,
  getHourHandY2
} from '../../data/hourHandGetters'

class HourHand extends React.Component {
  render() {
    const { dimension, currentTime: time } = this.props
    return (
      <line
        x1={getHourHandX1({ dimension, time })}
        y1={getHourHandY1({ dimension, time })}
        x2={getHourHandX2({ dimension, time })}
        y2={getHourHandY2({ dimension, time })}
        strokeWidth={2}
        stroke="black"
        marker-end="url(#triangle)"
      />
    )
  }
}

export default HourHand

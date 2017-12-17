import getHourMarkerLineCoords from '../../data/getHourMarkerLineCoords'

const formatHour = time => time.hour()

class HourMarker extends React.Component {
  render() {
    return (
      <g>
        <line
          {...getHourMarkerLineCoords(this.props.dimension, this.props.time)}
          strokeWidth={4}
          stroke="black"
        />
        {this.props.showText && <text>{formatHour(this.props.time)}</text>}
      </g>
    )
  }
}

export default HourMarker

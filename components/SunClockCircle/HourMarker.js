import * as hourMarkerGetters from '../../data/hourMarkerGetters'
import { formatToHours } from '../../data/timeFormatters'

class HourMarker extends React.Component {
  render() {
    const { dimension, time } = this.props

    return (
      <g>
        <line
          x1={hourMarkerGetters.getLineOuterX({ dimension, time })}
          y1={hourMarkerGetters.getLineOuterY({ dimension, time })}
          x2={hourMarkerGetters.getLineInnerX({ dimension, time })}
          y2={hourMarkerGetters.getLineInnerY({ dimension, time })}
          strokeWidth={4}
          stroke="black"
        />
        {this.props.showText && (
          <text
            x={hourMarkerGetters.getTextX({ dimension, time })}
            y={hourMarkerGetters.getTextY({ dimension, time })}
            textAnchor="middle"
            alignmentBaseline="central"
          >
            {formatToHours(this.props.time)}
          </text>
        )}
      </g>
    )
  }
}

export default HourMarker

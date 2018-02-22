import { connect } from 'react-redux'

import * as hourMarkerGetters from '~/data/hourMarkerGetters'
import { formatToHours } from '~/data/timeFormatters'
import getDimensionFromBrowser from '~/data/getDimensionFromBrowser'

class TriangleMarker extends React.Component {
  render() {
    return (
      <marker
        id="triangle"
        viewBox="0 0 10 10"
        refX="1"
        refY="5"
        markerWidth="6"
        markerHeight="6"
        orient="auto"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" />
      </marker>
    )
  }
}

class HourMarker extends React.Component {
  render() {
    const { lineProps, textProps, formattedTimeText, showText } = this.props

    return (
      <g>
        <defs>
          <TriangleMarker />
        </defs>
        <line {...lineProps} />
        {showText && <text {...textProps}>{formattedTimeText}</text>}
      </g>
    )
  }
}

const getFontFromBrowserDimension = dimension => dimension ** 0.05 * 17

const mapStateToProps = (state, { time, showText }) => ({
  lineProps: {
    x1: hourMarkerGetters.getLineOuterX(state, time),
    y1: hourMarkerGetters.getLineOuterY(state, time),
    x2: hourMarkerGetters.getLineInnerX(state, time),
    y2: hourMarkerGetters.getLineInnerY(state, time),
    strokeWidth: 4,
    stroke: 'black'
  },
  textProps: showText && {
    x: hourMarkerGetters.getTextX(state, time),
    y: hourMarkerGetters.getTextY(state, time),
    textAnchor: 'middle',
    alignmentBaseline: 'central',
    fontSize: `${getFontFromBrowserDimension(getDimensionFromBrowser())}px`
  },
  formattedTimeText: formatToHours(time)
})

export default connect(mapStateToProps)(HourMarker)

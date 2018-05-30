import { connect } from 'react-redux'

import * as hourMarkerGetters from './getters'
import { formatToHours } from '~/data/timeFormatters'
import getDimensionFromBrowser from '~/data/getDimensionFromBrowser'

class HourMarker extends React.Component {
  render() {
    const { lineProps, textProps, formattedTimeText, showText } = this.props

    return (
      <g>
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

import { connect } from 'react-redux'

import * as hourMarkerGetters from './getters'
import { formatToHours } from '~/data/timeFormatters'
import getDimensionFromBrowser from '~/data/getDimensionFromBrowser'

const getFontFromBrowserDimension = dimension => dimension ** 0.05 * 17

class _HourMarkerLine extends React.Component {
  render() {
    const { dispatch, ...otherProps } = this.props
    return <line {...otherProps} />
  }
}

const HourMarkerLine = connect((state, { time }) => ({
  x1: hourMarkerGetters.getLineOuterX(state, time),
  y1: hourMarkerGetters.getLineOuterY(state, time),
  x2: hourMarkerGetters.getLineInnerX(state, time),
  y2: hourMarkerGetters.getLineInnerY(state, time),
  strokeWidth: 4,
  stroke: 'black'
}))(_HourMarkerLine)

class _HourMarkerText extends React.Component {
  render() {
    const { dispatch, formattedDateText, ...otherProps } = this.props

    return <text {...otherProps}>{formattedDateText}</text>
  }
}

const HourMarkerText = connect((state, { time }) => ({
  x: hourMarkerGetters.getTextX(state, time),
  y: hourMarkerGetters.getTextY(state, time),
  textAnchor: 'middle',
  alignmentBaseline: 'central',
  fontSize: `${getFontFromBrowserDimension(getDimensionFromBrowser())}px`,
  formattedTimeText: formatToHours(time)
}))(_HourMarkerText)

class HourMarker extends React.Component {
  render() {
    const { time, showText } = this.props

    return (
      <g>
        <HourMarkerLine {...{ time }} />
        {showText && <HourMarkerText {...{ time }} />}
      </g>
    )
  }
}

export default HourMarker

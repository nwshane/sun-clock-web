import { connect } from 'react-redux'
import memoize from 'fast-memoize'

import * as dayMarkerGetters from './getters'
import getDimensionFromBrowser from '~/data/getDimensionFromBrowser'

const formatToShortenedDate = memoize((date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
)

class _DayMarkerLine extends React.Component {
  render() {
    const { dispatch, ...otherProps } = this.props
    return <line {...otherProps} />
  }
}

const DayMarkerLine = connect((state, { date }) => ({
  x1: dayMarkerGetters.getLineOuterX(state, date),
  y1: dayMarkerGetters.getLineOuterY(state, date),
  x2: dayMarkerGetters.getLineInnerX(state, date),
  y2: dayMarkerGetters.getLineInnerY(state, date),
  strokeWidth: 4,
  stroke: 'black',
}))(_DayMarkerLine)

class _DayMarkerText extends React.Component {
  render() {
    const { dispatch, formattedDateText, ...otherProps } = this.props

    return <text {...otherProps}>{formattedDateText}</text>
  }
}

const getFontFromBrowserDimension = (dimension) => dimension ** 0.05 * 17

const DayMarkerText = connect((state, { date }) => ({
  x: dayMarkerGetters.getTextX(state, date),
  y: dayMarkerGetters.getTextY(state, date),
  textAnchor: 'middle',
  alignmentBaseline: 'central',
  fontSize: `${getFontFromBrowserDimension(getDimensionFromBrowser())}px`,
  formattedDateText: formatToShortenedDate(date),
}))(_DayMarkerText)

export default class DayMarker extends React.Component {
  render() {
    const { date, showText } = this.props

    return (
      <g>
        <DayMarkerLine {...{ date }} />
        {showText && <DayMarkerText {...{ date }} />}
      </g>
    )
  }
}

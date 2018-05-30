import { connect } from 'react-redux'

import * as dayMarkerGetters from './getters'
// import { formatToShortenedDate } from '~/data/timeFormatters'
import getDimensionFromBrowser from '~/data/getDimensionFromBrowser'

const formatToShortenedDate = date => {
  console.log(date)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

class DayMarker extends React.Component {
  render() {
    const { lineProps, textProps, formattedDateText, showText } = this.props

    return (
      <g>
        <line {...lineProps} />
        {showText && <text {...textProps}>{formattedDateText}</text>}
      </g>
    )
  }
}

const getFontFromBrowserDimension = dimension => dimension ** 0.05 * 17

const mapStateToProps = (state, { date, showText }) => ({
  lineProps: {
    x1: dayMarkerGetters.getLineOuterX(state, date),
    y1: dayMarkerGetters.getLineOuterY(state, date),
    x2: dayMarkerGetters.getLineInnerX(state, date),
    y2: dayMarkerGetters.getLineInnerY(state, date),
    strokeWidth: 4,
    stroke: 'black'
  },
  textProps: showText && {
    x: dayMarkerGetters.getTextX(state, date),
    y: dayMarkerGetters.getTextY(state, date),
    textAnchor: 'middle',
    alignmentBaseline: 'central',
    fontSize: `${getFontFromBrowserDimension(getDimensionFromBrowser())}px`
  },
  formattedDateText: formatToShortenedDate(date)
})

export default connect(mapStateToProps)(DayMarker)

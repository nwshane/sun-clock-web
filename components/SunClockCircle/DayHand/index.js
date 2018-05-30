import { connect } from 'react-redux'

import {
  getDayHandX1,
  getDayHandY1,
  getDayHandX2,
  getDayHandY2
} from './getters'

import { getCurrentTime } from '~/data/getters'

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

class DayHand extends React.Component {
  render() {
    const { dispatch, ...props } = this.props

    return (
      <g>
        <defs>
          <TriangleMarker />
        </defs>
        <line {...props} />
      </g>
    )
  }
}

const mapStateToProps = state => ({
  x1: getDayHandX1(state),
  y1: getDayHandY1(state),
  x2: getDayHandX2(state),
  y2: getDayHandY2(state),
  strokeWidth: 2,
  stroke: 'black',
  markerEnd: 'url(#triangle)'
})

export default connect(mapStateToProps, null)(DayHand)

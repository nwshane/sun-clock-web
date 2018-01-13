import { connect } from 'react-redux'

import {
  getHourHandX1,
  getHourHandY1,
  getHourHandX2,
  getHourHandY2
} from '../../data/hourHandGetters'

import { getCurrentTime } from '../../data/getters'

class HourHand extends React.Component {
  render() {
    const { dispatch, ...props } = this.props

    return <line {...props} />
  }
}

const mapStateToProps = state => ({
  x1: getHourHandX1(state),
  y1: getHourHandY1(state),
  x2: getHourHandX2(state),
  y2: getHourHandY2(state),
  strokeWidth: 2,
  stroke: 'black',
  markerEnd: 'url(#triangle)'
})

export default connect(mapStateToProps, null)(HourHand)

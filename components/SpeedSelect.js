import React from 'react'
import { connect } from 'react-redux'
import Slider from 'rc-slider/lib/Slider'
import 'rc-slider/assets/index.css'

import { setRateOfClockDateChange } from '~/data/actions'

class SpeedSelect extends React.Component {
  handleChange = newSpeed => {
    this.props.dispatch(setRateOfClockDateChange(newSpeed))
  }

  render() {
    const { rateOfClockDateChange } = this.props

    return (
      <div>
        <Slider onChange={this.handleChange} value={rateOfClockDateChange} />
      </div>
    )
  }
}

export default connect(
  ({ rateOfClockDateChange }) => ({
    rateOfClockDateChange
  }),
  dispatch => ({
    dispatch
  })
)(SpeedSelect)

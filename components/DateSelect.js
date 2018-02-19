import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { getClockDate } from '../data/getters'
import { setClockDateAndRetainTime } from '../data/actions'

class DateSelect extends React.Component {
  handleChange = momentDate => {
    this.props.setClockDateAndRetainTime(momentDate.toDate())
  }

  render() {
    return (
      <div data-name-for-tests="clock-date-select-container">
        <label htmlFor="clock-date-picker">Clock Date</label>
        <DatePicker
          id="clock-date-picker"
          name="clock-date-picker"
          dateFormat="YYYY-MM-DD"
          selected={moment(this.props.clockDate)}
          onChange={this.handleChange}
        />
        <style jsx>{`
          div {
            position: absolute;
            bottom: 20px;
            left: 20px;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  clockDate: getClockDate(state)
})

const mapDispatchToProps = dispatch => ({
  setClockDateAndRetainTime: date => dispatch(setClockDateAndRetainTime(date))
})

export default connect(mapStateToProps, mapDispatchToProps)(DateSelect)

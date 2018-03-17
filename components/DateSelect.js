import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { getClockDate } from '../data/getters'
import { setClockDateAndRetainTime } from '../data/actions'
import EditIcon from './edit_icon.svg'

class DateSelect extends React.Component {
  handleChange = momentDate => {
    this.props.setClockDateAndRetainTime(momentDate.toDate())
  }

  render() {
    return (
      <div data-name-for-tests="clock-date-select-container">
        <label htmlFor="clock-date-picker">
          <span className="label-date">Date:</span>
          <DatePicker
            id="clock-date-picker"
            name="clock-date-picker"
            dateFormat="YYYY-MM-DD"
            selected={moment(this.props.clockDate)}
            onChange={this.handleChange}
          />
          <span
            className="label-edit-icon"
            dangerouslySetInnerHTML={{ __html: EditIcon }}
          />
        </label>
        <style jsx>{`
          div {
            position: absolute;
            bottom: 20px;
            left: 20px;
          }
          label {
            cursor: pointer;
            display: flex;
          }
          .label-date {
            margin-right: 7px;
          }
          .label-edit-icon {
            width: 2.3em;
            margin-top: -0.46em;
            margin-left: -0.5em;
          }
        `}</style>
        <style jsx global>{`
          input#clock-date-picker {
            font-size: inherit;
            font-family: inherit;
            max-width: 5em;
            border: none;
            cursor: pointer;
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

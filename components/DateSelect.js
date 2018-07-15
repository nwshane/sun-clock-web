import React from 'react'
import { connect } from 'react-redux'
import { getQueryParams } from '~/data/query'
import DatePicker from 'react-datepicker'
import Router from 'next/router'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DateIcon from './DateIcon'
import ResetDateButton from './ResetDateButton'

import {
  getLocalClockDate,
  shouldShowDayCircle,
  shouldShowResetDateButton
} from '~/data/getters'
import { HOVER_LINK_COLOR } from '~/data/constants'
import { setClockDateAndRetainTime } from '~/data/actions'

class _DatePickerSelect extends React.Component {
  shouldComponentUpdate = nextProps =>
    this.props.clockDate.valueOf() !== nextProps.clockDate.valueOf()

  handleChange = momentDate => {
    Router.push({
      pathname: window.location.pathname,
      query: Object.assign({}, getQueryParams(), {
        date: momentDate.format('YYYY-MM-DD')
      })
    })
    this.props.dispatch(setClockDateAndRetainTime(momentDate.toDate()))
  }

  render() {
    const { clockDate, showDayCircle } = this.props

    return showDayCircle ? (
      <DatePicker
        id="clock-date-picker"
        name="clock-date-picker"
        dateFormat="YYYY-MM-DD"
        selected={moment(clockDate)}
        onChange={this.handleChange}
        shouldCloseOnSelect={false}
      />
    ) : (
      clockDate.getFullYear()
    )
  }
}

const DatePickerSelect = connect(state => ({
  clockDate: getLocalClockDate(state),
  showDayCircle: shouldShowDayCircle(state)
}))(_DatePickerSelect)

class DateSelect extends React.Component {
  render() {
    const { showDayCircle, showResetDateButton } = this.props

    return (
      <div data-test="clock-date-select-container">
        <label htmlFor="clock-date-picker">
          <DateIcon />
          <DatePickerSelect />
        </label>
        {showResetDateButton && <ResetDateButton />}
        <style jsx>{`
          div {
            align-items: center;
            border-radius: 3px;
            display: inline-flex;
            background-color: white;
            padding: 5px;
          }
          label {
            cursor: ${showDayCircle ? 'pointer' : ''};
            display: flex;
            align-items: center;
          }
          label:hover {
            color: ${showDayCircle ? HOVER_LINK_COLOR : 'initial'};
            fill: ${showDayCircle ? HOVER_LINK_COLOR : 'initial'};
          }
        `}</style>
        <style jsx global>{`
          input#clock-date-picker {
            font-size: inherit;
            font-family: inherit;
            max-width: 5.8em;
            border: none;
            cursor: ${showDayCircle ? 'pointer' : ''};
            color: inherit;
          }
        `}</style>
      </div>
    )
  }
}

export default connect(state => ({
  showDayCircle: shouldShowDayCircle(state),
  showResetDateButton: shouldShowResetDateButton(state)
}))(DateSelect)

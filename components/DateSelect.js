import 'react-dates/initialize'
import React from 'react'
import { connect } from 'react-redux'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/lib/css/_datepicker.css'
import Router from 'next/router'
import moment from 'moment'

import DateIcon from './DateIcon'
import ResetDateButton from './ResetDateButton'

import {
  getLocalClockDate,
  shouldShowDayCircle,
  shouldShowResetDateButton
} from '~/data/getters'
import { HOVER_LINK_COLOR } from '~/data/constants'
import { setClockDateAndRetainTime } from '~/data/actions'
import { getQueryParams } from '~/data/query'

class _DatePickerSelect extends React.Component {
  state = {
    focused: false
  }
  shouldComponentUpdate = nextProps =>
    this.props.clockDate.valueOf() !== nextProps.clockDate.valueOf()

  handleDateChange = momentDate => {
    Router.push({
      pathname: window.location.pathname,
      query: Object.assign({}, getQueryParams(), {
        date: momentDate.format('YYYY-MM-DD')
      })
    })
    this.props.dispatch(setClockDateAndRetainTime(momentDate.toDate()))
  }

  handleFocusChange = ({ focused }) => this.setState({ focused })

  render() {
    const { clockDate, showDayCircle } = this.props
    const { focused } = this.state

    return showDayCircle ? (
      <SingleDatePicker
        id="clock-date-picker"
        displayFormat="YYYY-MM-DD"
        date={moment(clockDate)}
        hideKeyboardShortcutsPanel
        onDateChange={this.handleDateChange}
        onFocusChange={this.handleFocusChange}
        openDirection="up"
        noBorder
        numberOfMonths={1}
        {...{ focused }}
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
          .DayPicker_transitionContainer {
            height: 336px !important;
          }

          .DateInput {
            width: 172px;
          }

          .DateInput_input {
            cursor: ${showDayCircle ? 'pointer' : ''};
            color: inherit;
            font-family: inherit;
            font-size: inherit;
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

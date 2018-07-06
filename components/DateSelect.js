import React from 'react'
import { getQueryParams } from '~/data/query'
import DatePicker from 'react-datepicker'
import Router from 'next/router'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'
import DateIcon from './DateIcon'

import { connect } from 'react-redux'

import { getLocalClockDate, shouldShowDayCircle } from '../data/getters'
import { HOVER_LINK_COLOR } from '~/data/constants'

import { setClockDateAndRetainTime } from '../data/actions'

const padZeroes = num => (num < 10 ? '0' + num : num.toString())

const getFormattedDate = date =>
  `${date.getFullYear()}-${padZeroes(date.getMonth())}-${padZeroes(
    date.getDate()
  )}`

class _DatePickerSelect extends React.Component {
  shouldComponentUpdate = nextProps => {
    const { clockDate, showDayCircle } = this.props
    const nextClockDate = nextProps.clockDate

    if (showDayCircle) {
      return (
        clockDate.getFullYear() !== nextClockDate.getFullYear() ||
        clockDate.getMonth() !== nextClockDate.getMonth() ||
        clockDate.getDate() !== nextClockDate.getDate()
      )
    } else {
      return getFormattedDate(clockDate) !== getFormattedDate(nextClockDate)
    }
  }

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
      getFormattedDate(clockDate)
    )
  }
}

const DatePickerSelect = connect(state => ({
  clockDate: getLocalClockDate(state),
  showDayCircle: shouldShowDayCircle(state)
}))(_DatePickerSelect)

class DateSelect extends React.Component {
  render() {
    const { showDayCircle } = this.props

    return (
      <div data-test="clock-date-select-container">
        <label htmlFor="clock-date-picker">
          <DateIcon />
          <DatePickerSelect />
        </label>
        <style jsx>{`
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
  showDayCircle: shouldShowDayCircle(state)
}))(DateSelect)

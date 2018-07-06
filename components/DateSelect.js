import React from 'react'
import { getQueryParams } from '~/data/query'
import DatePicker from 'react-datepicker'
import Router from 'next/router'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { getLocalClockDate } from '../data/getters'
import { HOVER_LINK_COLOR } from '~/data/constants'
import EditIcon from './EditIcon'

import { setClockDateAndRetainTime } from '../data/actions'

class _DatePickerSelect extends React.Component {
  shouldComponentUpdate = nextProps => {
    const { clockDate } = this.props
    const nextClockDate = nextProps.clockDate

    return (
      clockDate.getFullYear() !== nextClockDate.getFullYear() ||
      clockDate.getMonth() !== nextClockDate.getMonth() ||
      clockDate.getDate() !== nextClockDate.getDate()
    )
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
    const { clockDate } = this.props

    return (
      <DatePicker
        id="clock-date-picker"
        name="clock-date-picker"
        dateFormat="YYYY-MM-DD"
        selected={moment(clockDate)}
        onChange={this.handleChange}
        shouldCloseOnSelect={false}
      />
    )
  }
}

const DatePickerSelect = connect(state => ({
  clockDate: getLocalClockDate(state)
}))(_DatePickerSelect)

class DateSelect extends React.Component {
  render() {
    return (
      <div data-test="clock-date-select-container">
        <label htmlFor="clock-date-picker">
          <span className="label-date">Date:</span>
          <DatePickerSelect />
          <span className="label-edit-icon">
            <EditIcon />
          </span>
        </label>
        <style jsx>{`
          label {
            cursor: pointer;
            display: flex;
          }
          label:hover {
            color: ${HOVER_LINK_COLOR};
            fill: ${HOVER_LINK_COLOR};
          }
          .label-date {
            margin-right: 7px;
          }
          .label-edit-icon {
            width: 1em;
            margin-top: 0.1em;
            margin-left: -0.05em;
          }
        `}</style>
        <style jsx global>{`
          input#clock-date-picker {
            font-size: inherit;
            font-family: inherit;
            max-width: 5em;
            border: none;
            cursor: pointer;
            color: inherit;
          }
        `}</style>
      </div>
    )
  }
}

export default DateSelect

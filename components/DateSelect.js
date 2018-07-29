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
import { setClockDateAndRetainTime, setPaused } from '~/data/actions'
import { getQueryParams } from '~/data/query'
import {
  enableFadeOut,
  disableFadeOut
} from '~/data/fadeOutElementsWhenInactive'

class _DatePickerSelect extends React.Component {
  state = {
    focused: false
  }

  shouldComponentUpdate = (nextProps, nextState) =>
    this.props.clockDate.valueOf() !== nextProps.clockDate.valueOf() ||
    this.props.showDayCircle !== nextProps.showDayCircle ||
    this.state.focused !== nextState.focused

  handleDateChange = momentDate => {
    Router.push({
      pathname: window.location.pathname,
      query: Object.assign({}, getQueryParams(), {
        date: momentDate.format('YYYY-MM-DD')
      })
    })
  }

  handleFocusChange = ({ focused }) => {
    this.setState({ focused })

    // When the user has the date select open, and then clicks the
    // location select, we want:
    // - the date select to close
    // - the location select to open
    // - the clock to remain paused and the fade out disabled
    //
    // the problem is that the location select onFocus event
    // triggers BEFORE the date select focus change, and so
    // the date select unpauses the clock and enables the fade out
    //
    // this little global browser hack fixes that issue
    if (!focused && window.locationSelectIsFocused) return

    if (focused) {
      this.props.dispatch(setPaused(true))
      disableFadeOut()
    } else {
      this.props.dispatch(setPaused(false))
      enableFadeOut()
    }
  }

  render() {
    const { clockDate, showDayCircle } = this.props
    const { focused } = this.state

    return showDayCircle ? (
      <SingleDatePicker
        id="clock-date-picker"
        displayFormat="YYYY-MM-DD"
        date={moment(clockDate)}
        hideKeyboardShortcutsPanel
        isOutsideRange={() => false}
        onDateChange={this.handleDateChange}
        onFocusChange={this.handleFocusChange}
        openDirection="up"
        noBorder
        numberOfMonths={1}
        readOnly
        {...{ focused }}
      />
    ) : (
      <span>
        {clockDate.getFullYear()}

        <style jsx>{`
          span {
            vertical-align: middle;
          }
        `}</style>
      </span>
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
      <div
        className="fade-out-when-inactive"
        data-test="clock-date-select-container"
      >
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
            width: 6em;
          }

          .DateInput_input {
            border-bottom: 0 !important;
            cursor: ${showDayCircle ? 'pointer' : ''};
            color: inherit;
            font-family: inherit;
            font-size: inherit;
            padding: 0;
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

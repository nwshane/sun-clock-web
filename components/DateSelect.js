import React from 'react'
import DatePicker from 'react-datepicker'
import Router from 'next/router'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

import { connect } from 'react-redux'

import { getLocalClockDate } from '../data/getters'
import { HOVER_LINK_COLOR } from '~/data/constants'
import EditIcon from './edit_icon.svg'

import { setClockDateAndRetainTime } from '../data/actions'

class DateSelect extends React.Component {
  handleChange = momentDate => {
    Router.push({
      pathname: Router.pathname,
      query: Object.assign({}, Router.query, {
        date: momentDate.format('YYYY-MM-DD')
      })
    })
    this.props.dispatch(setClockDateAndRetainTime(momentDate.toDate()))
  }

  render() {
    return (
      <div data-test="clock-date-select-container">
        <label htmlFor="clock-date-picker">
          <span className="label-date">Date:</span>
          <DatePicker
            id="clock-date-picker"
            name="clock-date-picker"
            dateFormat="YYYY-MM-DD"
            selected={moment(this.props.clockDate)}
            onChange={this.handleChange}
            shouldCloseOnSelect={false}
          />
          <span
            className="label-edit-icon"
            dangerouslySetInnerHTML={{ __html: EditIcon }}
          />
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
            color: inherit;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  clockDate: getLocalClockDate(state)
})

export default connect(mapStateToProps)(DateSelect)

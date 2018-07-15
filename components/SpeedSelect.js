import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Rheostat from 'rheostat'
import log10 from 'rheostat/lib/algorithms/log10'
import 'rheostat/css/slider.css'

import { setRateOfClockDateChange } from '~/data/actions'
import { YEAR_CIRCLE_MIN_SPEED } from '~/data/constants'
import { getQueryParams } from '~/data/query'

const convertToReadableSpeed = speed => {
  const numSecondsPerMinute = 60
  const numSecondsPerHour = 60 * 60
  const numSecondsPerDay = 60 * 60 * 24

  if (speed === 1) {
    return 'Real Time'
  } else if (speed < numSecondsPerMinute) {
    return `${speed} seconds/second`
  } else if (speed < numSecondsPerHour) {
    const numMinutes = Math.round(speed / numSecondsPerMinute)

    if (numMinutes === 1) {
      return '1 minute/second'
    } else {
      return `${numMinutes} minutes/second`
    }
  } else if (speed < numSecondsPerDay) {
    const numHours = Math.round(speed / numSecondsPerHour)

    if (numHours === 1) {
      return '1 hour/second'
    } else {
      return `${numHours} hours/second`
    }
  }
  const numDays = Math.round(speed / numSecondsPerDay)

  if (numDays === 1) {
    return '1 day/second'
  } else {
    return `${numDays} days/second`
  }
}

class SpeedSelect extends React.Component {
  handleChange = (data, options = {}) => {
    const newSpeed = data.values[0]
    this.props.dispatch(setRateOfClockDateChange(newSpeed))

    if (options.pushHistory) {
      const oldQuery = getQueryParams()
      delete oldQuery.speed
      Router.push({
        pathname: window.location.pathname,
        query: Object.assign(
          {},
          oldQuery,
          newSpeed === 1
            ? {}
            : {
                speed: newSpeed
              }
        )
      })
    }
  }

  render() {
    const { rateOfClockDateChange } = this.props

    return (
      <div>
        <p>Speed: {convertToReadableSpeed(rateOfClockDateChange)}</p>
        <Rheostat
          pitComponent={({ style, children }) => (
            <div
              style={{
                ...style,
                background: '#a2a2a2',
                width: 2,
                height: '15px',
                zIndex: 2,
                transform: 'translate(0, -65%)'
              }}
            />
          )}
          algorithm={log10}
          min={1}
          // max speed: 365 days/second
          max={60 * 60 * 24 * 365}
          onValuesUpdated={this.handleChange}
          onChange={data => this.handleChange(data, { pushHistory: true })}
          values={[rateOfClockDateChange]}
          pitPoints={[YEAR_CIRCLE_MIN_SPEED]}
        />
        <style global jsx>{`
          .rheostat {
            margin-top: 10px;
            width: 8em;
          }
          .rheostat-background {
            background-color: #c6e8f4;
            height: 3px;
          }
          .rheostat-handle {
            border-radius: 50%;
            width: 18px;
            height: 18px;
            transform: translate(-50%, -63%);
          }
        `}</style>
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

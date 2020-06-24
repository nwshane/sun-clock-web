import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Rheostat from 'rheostat'
import log10 from 'rheostat/lib/algorithms/log10'
import 'rheostat/css/slider.css'

import { setRateOfClockDateChange } from '~/data/actions'
import { YEAR_CIRCLE_MIN_SPEED, HOVER_LINK_COLOR } from '~/data/constants'
import { getQueryParams } from '~/data/query'
import { resetFadeOut } from '~/data/fadeOutElementsWhenInactive'

const convertToReadableSpeed = (speed) => {
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
  handleValuesUpdated = (data, options = {}) => {
    // The reset date button resets the speed to 1, which triggers this method.
    // This is problematic because this method only removes speed from the url,
    // and the reset date button needs to remove both date AND speed. So this
    // is a hack using the global state to prevent updating speed select
    // if it is invoked by the reset date button.
    if (window.justClickedResetDateButton) {
      window.justClickedResetDateButton = false
      return
    }

    resetFadeOut()

    const newSpeed = data.values[0]

    // If we change the speed in the URL, then we'll let SunClock
    // componentDidUpdate update the speed.
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
                speed: newSpeed,
              }
        ),
      })
    } else {
      this.props.dispatch(setRateOfClockDateChange(newSpeed))
    }
  }

  handleChange = (data) => this.handleValuesUpdated(data, { pushHistory: true })

  render() {
    const { rateOfClockDateChange } = this.props

    return (
      <div className="fade-out-when-inactive">
        <Rheostat
          pitComponent={({ style, children }) => (
            <div
              style={{
                ...style,
                background: '#a2a2a2',
                width: 2,
                height: '22px',
                zIndex: 2,
                transform: 'translate(0, -69%)',
              }}
            />
          )}
          algorithm={log10}
          min={1}
          // max speed: 365 days/second
          max={60 * 60 * 24 * 365}
          onValuesUpdated={this.handleValuesUpdated}
          onChange={this.handleChange}
          values={[rateOfClockDateChange]}
          pitPoints={[YEAR_CIRCLE_MIN_SPEED]}
        />
        <p className="speed-label">
          Speed: {convertToReadableSpeed(rateOfClockDateChange)}
        </p>
        <style global jsx>{`
          .speed-label {
            font-size: 0.6em;
          }
          .rheostat {
            margin-top: 10px;
            margin-bottom: 10px;
            width: 8em;
            cursor: pointer;
          }
          .rheostat-background {
            background-color: #c6e8f4;
            height: 5px;
          }
          .rheostat-handle {
            border-radius: 50%;
            width: 22px;
            height: 22px;
            transform: translate(-50%, -69%);
            cursor: grab;

            // put handle above year mode line
            z-index: 3;
          }
          .rheostat-handle:hover {
            background-color: ${HOVER_LINK_COLOR};
          }
          .rheostat-handle:active {
            background-color: ${HOVER_LINK_COLOR};
            cursor: grabbing;
          }
        `}</style>
      </div>
    )
  }
}

export default connect(
  ({ rateOfClockDateChange }) => ({
    rateOfClockDateChange,
  }),
  (dispatch) => ({
    dispatch,
  })
)(SpeedSelect)

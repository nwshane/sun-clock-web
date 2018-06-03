import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import Rheostat from 'rheostat'
import log10 from 'rheostat/lib/algorithms/log10'
import 'rheostat/css/slider.css'

import { setRateOfClockDateChange } from '~/data/actions'
import { YEAR_CIRCLE_MIN_SPEED } from '~/data/constants'

class PitComponent extends React.Component {
  render() {
    return <span className="year-clock-marker">Year</span>
  }
}

class SpeedSelect extends React.Component {
  handleChange = (data, options = {}) => {
    const newSpeed = data.values[0]
    this.props.dispatch(setRateOfClockDateChange(newSpeed))

    if (options.pushHistory) {
      const oldQuery = Router.query
      delete oldQuery.speed
      Router.push({
        pathname: Router.pathname,
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
        <p>Speed:</p>
        <Rheostat
          pitComponent={({ style, children }) => (
            <div
              style={{
                ...style,
                background: '#a2a2a2',
                width: 2,
                height: '15px',
                zIndex: 99999,
                transform: 'translate(0, -65%)'
              }}
            />
          )}
          algorithm={log10}
          min={1}
          max={10 ** 8}
          onValuesUpdated={this.handleChange}
          onChange={data => this.handleChange(data, { pushHistory: true })}
          values={[rateOfClockDateChange]}
          pitPoints={[YEAR_CIRCLE_MIN_SPEED]}
        />
        <style jsx>{``}</style>
        <style global jsx>{`
          .rheostat {
            margin-top: 10px;
          }
          .rheostat-background {
            background-color: #c6e8f4;
            height: 3px;
          }
          .rheostat-handle {
            border-radius: 50%;
            width: 18px;
            height: 18px;
            transform: translate(0, -63%);
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

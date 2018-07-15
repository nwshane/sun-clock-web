import { connect } from 'react-redux'
import Router from 'next/router'

import { getQueryParams } from '~/data/query'
import { setClockDate, setRateOfClockDateChange } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'
import ClockResetIcon from './ClockResetIcon'

class ResetDateButton extends React.Component {
  handleClick = () => {
    const oldQueryParams = getQueryParams()
    let newQueryParams = Object.assign({}, oldQueryParams)
    delete newQueryParams.speed
    delete newQueryParams.date

    Router.push({
      pathname: window.location.pathname,
      query: newQueryParams
    })

    this.props.dispatch(setClockDate(new Date()))
    this.props.dispatch(setRateOfClockDateChange(1))
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.handleClick}
        title="Reset clock to current date"
        data-test="reset-date-button"
      >
        <ClockResetIcon />
        <style jsx>{`
          button {
            background: transparent;
            border: none;
            cursor: pointer;
            display: flex;
            fill: black;
            font-size: inherit;
          }
          button:hover {
            fill: ${HOVER_LINK_COLOR};
          }
        `}</style>
      </button>
    )
  }
}

export default connect(null)(ResetDateButton)

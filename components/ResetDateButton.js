import { connect } from 'react-redux'
import Router from 'next/router'

import { getQueryParams } from '~/data/query'
import { setClockDate } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'
import ClockResetIcon from './ClockResetIcon'

class ResetDateButton extends React.Component {
  handleClick = () => {
    let newQueryParams = Object.assign({}, getQueryParams())
    delete newQueryParams.date

    Router.push({
      pathname: window.location.pathname,
      query: newQueryParams
    })

    this.props.dispatch(setClockDate(new Date()))
  }

  render() {
    return (
      <button
        type="button"
        onClick={this.handleClick}
        title="Reset clock to current date"
      >
        <ClockResetIcon />
        <style jsx>{`
          button {
            background: transparent;
            border: none;
            cursor: pointer;
            stroke: black;
          }
          button:hover {
            stroke: ${HOVER_LINK_COLOR};
          }
        `}</style>
      </button>
    )
  }
}

export default connect(null)(ResetDateButton)

import { connect } from 'react-redux'
import Router from 'next/router'

import { getQueryParams } from '~/data/query'
import { setClockDate } from '~/data/actions'

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
      <button type="button" onClick={this.handleClick}>
        Reset
      </button>
    )
  }
}

export default connect(null)(ResetDateButton)

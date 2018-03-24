import { connect } from 'react-redux'

import SunClockPresentation from './SunClockPresentation'
import AppMessage from './AppMessage'
import {
  fetchCurrentLocationData,
  setError,
  startTick,
  clearTick
} from '../data/actions'

class SunClock extends React.Component {
  componentDidMount() {
    if ('geolocation' in navigator) {
      this.props.fetchCurrentLocationData()
      this.props.startTick()
    } else {
      this.props.setError(
        new Error(
          "Your browser doesn't support geolocation; please try another browser."
        )
      )
    }
  }

  componentWillUnmount() {
    this.props.clearTick(this.interval)
  }

  render() {
    if (this.props.error)
      return <AppMessage text={`Error: ${this.props.error.message}`} />

    return <SunClockPresentation />
  }
}

const mapStateToProps = state => ({
  error: state.error
})

const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error)),
  fetchCurrentLocationData: () => dispatch(fetchCurrentLocationData()),
  startTick: () => dispatch(startTick()),
  clearTick: () => dispatch(clearTick())
})

export default connect(mapStateToProps, mapDispatchToProps)(SunClock)

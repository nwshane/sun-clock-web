import { connect } from 'react-redux'

import SunClockPresentation from './SunClockPresentation'
import AppMessage from './AppMessage'
import { fetchSunData, setError, startTick, clearTick } from '../data/actions'

class SunClock extends React.Component {
  componentDidMount() {
    if ('geolocation' in navigator) {
      this.props.fetchSunData()
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

    if (this.props.loading)
      return (
        <AppMessage text="Loading sunrise and sunset times for your current location!" />
      )
    return <SunClockPresentation />
  }
}

const mapStateToProps = state => ({
  error: state.error,
  loading: state.loading
})

const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error)),
  fetchSunData: () => dispatch(fetchSunData()),
  startTick: () => dispatch(startTick()),
  clearTick: () => dispatch(clearTick())
})

export default connect(mapStateToProps, mapDispatchToProps)(SunClock)

import { connect } from 'react-redux'
import locations from '~/data/locations'

import SunClockPresentation from './SunClockPresentation'
import AppMessage from './AppMessage'
import { getSunriseDate, getSunsetDate } from '~/data/getters'
import {
  fetchCurrentLocationData,
  setError,
  startTick,
  clearTick,
  updateSunTimes,
  setNewLocation,
  setClockDate,
  setClockDateAndRetainTime
} from '../data/actions'

const getRandomLocationId = () => {
  const locationKeys = Object.keys(locations)

  return locationKeys[Math.floor(Math.random() * locationKeys.length)]
}

class SunClock extends React.Component {
  updateLocation() {
    const { queryParams } = this.props

    if (queryParams.location) {
      this.props.setNewLocation(queryParams.location)
    } else {
      this.props.setNewLocation(getRandomLocationId())
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryParams.location !== this.props.queryParams.location) {
      this.updateLocation()
    }
  }

  componentDidMount() {
    const { queryParams } = this.props

    this.props.setClockDateToNow()

    if (queryParams.date) {
      const match = queryParams.date.match(/(\d+)-(\d\d)-(\d\d)/)
      const queryDate = new Date(match[1], match[2] - 1, match[3])
      this.props.setClockDateAndRetainTime(queryDate)
    }

    this.updateLocation()

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
    const { error, sunriseDate, sunsetDate } = this.props

    if (!sunriseDate || !sunsetDate) return null
    if (error) return <AppMessage text={`Error: ${error.message}`} />

    return <SunClockPresentation />
  }
}

const mapStateToProps = state => ({
  error: state.error,
  sunriseDate: getSunriseDate(state),
  sunsetDate: getSunsetDate(state)
})

const mapDispatchToProps = dispatch => ({
  setError: error => dispatch(setError(error)),
  fetchCurrentLocationData: () => dispatch(fetchCurrentLocationData()),
  startTick: () => dispatch(startTick()),
  clearTick: () => dispatch(clearTick()),
  updateSunTimes: () => dispatch(updateSunTimes()),
  setNewLocation: locationId => dispatch(setNewLocation(locationId)),
  setClockDateAndRetainTime: date => dispatch(setClockDateAndRetainTime(date)),
  setClockDateToNow: () => dispatch(setClockDate(new Date()))
})

export default connect(mapStateToProps, mapDispatchToProps)(SunClock)

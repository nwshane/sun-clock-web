import { connect } from 'react-redux'
import locations from '~/data/locations'

import SunClockPresentation from './SunClockPresentation'
import AppMessage from './AppMessage'
import { getSunriseDate, getSunsetDate } from '~/data/getters'

import {
  getSelectedLocation,
  getCurrentLocationIsLoading
} from '~/data/getters/location'

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
  shouldLoadRandomLocation = () => {
    const { currentLocationIsLoading, selectedLocationId } = this.props
    if (currentLocationIsLoading) return true
    if (!currentLocationIsLoading && !selectedLocationId) return true
    return false
  }

  updateLocation() {
    const { queryParams } = this.props

    if (queryParams.location) {
      this.props.setNewLocation(queryParams.location)
    } else {
      this.props.setNewLocation(
        this.shouldLoadRandomLocation() ? getRandomLocationId() : 'current'
      )
    }
  }

  componentDidUpdate(prevProps) {
    const prevLocationId = prevProps.queryParams.location
    const newLocationId = this.props.queryParams.location
    if (prevLocationId !== newLocationId) {
      this.updateLocation()
    }
  }

  componentDidMount() {
    const { queryParams } = this.props

    if ('geolocation' in navigator) {
      this.props.fetchCurrentLocationData()
    } else {
      this.props.setError(
        new Error(
          "Your browser doesn't support geolocation; please try another browser."
        )
      )
    }

    this.props.setClockDateToNow()

    if (queryParams.date) {
      const match = queryParams.date.match(/(\d+)-(\d\d)-(\d\d)/)
      const queryDate = new Date(match[1], match[2] - 1, match[3])
      this.props.setClockDateAndRetainTime(queryDate)
    }

    this.updateLocation()

    this.props.startTick()
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
  currentLocationIsLoading: getCurrentLocationIsLoading(state),
  error: state.error,
  selectedLocationId: getSelectedLocation(state).id,
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

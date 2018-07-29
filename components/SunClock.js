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
  setClockDateAndRetainTime,
  setRateOfClockDateChange
} from '../data/actions'

import fadeOutElementsWhenInactive from '~/data/fadeOutElementsWhenInactive'

const getRandomLocationId = () => {
  const locationKeys = Object.keys(locations)

  return locationKeys[Math.floor(Math.random() * locationKeys.length)]
}

function isPositiveInteger(str) {
  var n = Math.floor(Number(str))
  return n !== Infinity && String(n) === str && n > 0
}

class SunClock extends React.Component {
  shouldComponentUpdate = nextProps => {
    const {
      currentLocationIsLoading,
      error,
      selectedLocationId,
      queryParams,
      sunriseDate,
      sunsetDate
    } = this.props

    return (
      currentLocationIsLoading !== nextProps.currentLocationIsLoading ||
      error !== nextProps.error ||
      selectedLocationId !== nextProps.selectedLocationId ||
      sunriseDate.valueOf() !== nextProps.sunriseDate.valueOf() ||
      sunsetDate.valueOf() !== nextProps.sunsetDate.valueOf() ||
      queryParams.location !== nextProps.queryParams.location ||
      queryParams.date !== nextProps.queryParams.date ||
      queryParams.speed !== nextProps.queryParams.speed
    )
  }

  shouldLoadRandomLocation = () => {
    const { currentLocationIsLoading, selectedLocationId } = this.props
    if (currentLocationIsLoading) return true
    if (!currentLocationIsLoading && !selectedLocationId) return true
    return false
  }

  updateLocation = () => {
    const { queryParams } = this.props

    if (queryParams.location) {
      this.props.setNewLocation(queryParams.location)
    } else {
      this.props.setNewLocation(
        this.shouldLoadRandomLocation() ? getRandomLocationId() : 'current'
      )
    }
  }

  getInitialDate = () => {
    const { queryParams } = this.props

    if (queryParams.date) {
      const match = queryParams.date.match(/(\d+)-(\d\d)-(\d\d)/)
      const queryDate = new Date(match[1], match[2] - 1, match[3])
      return queryDate
    } else {
      return new Date()
    }
  }

  updateSpeed = () => {
    const { setRateOfClockDateChange, queryParams } = this.props

    const newSpeed =
      // the query parameter exists and is a number
      queryParams.speed && isPositiveInteger(queryParams.speed)
        ? parseInt(queryParams.speed)
        : 1

    setRateOfClockDateChange(newSpeed)
  }

  updateDate = () => {
    this.props.setClockDateAndRetainTime(this.getInitialDate())
  }

  componentDidUpdate(prevProps) {
    const prevQuery = prevProps.queryParams
    const newQuery = this.props.queryParams
    if (prevQuery.location !== newQuery.location) this.updateLocation()
    if (prevQuery.date !== newQuery.date) this.updateDate()
    if (prevQuery.speed !== newQuery.speed) this.updateSpeed()
  }

  componentDidMount() {
    const { queryParams } = this.props

    if ('geolocation' in navigator) {
      this.props.fetchCurrentLocationData()
    } else {
      this.props.setError(
        "Your browser doesn't support geolocation; please try another browser."
      )
    }

    this.updateDate()
    this.updateLocation()
    this.updateSpeed()
    this.props.startTick()
    fadeOutElementsWhenInactive()
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
  setRateOfClockDateChange: rateOfClockDateChange =>
    dispatch(setRateOfClockDateChange(rateOfClockDateChange))
})

export default connect(mapStateToProps, mapDispatchToProps)(SunClock)

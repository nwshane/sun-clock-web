import React from 'react'
import Router from 'next/router'
import { getQueryParams } from '~/data/query'
import { connect } from 'react-redux'

import LocationSelect from './LocationSelect'

import {
  getCurrentLocationIsLoading,
  getSelectedLocation
} from '~/data/getters/location'
import { setClockDate, setNewLocation } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'
import LocationIcon from './LocationIcon'
import LoadingDots from './LoadingDots'

class LocationSelectContainer extends React.Component {
  showCurrentLocation = () => {
    // if a url has a specified location, then we want to remove it so
    // so that a shared URL will use the default location functionality
    if (getQueryParams()) {
      const newQuery = Object.assign({}, getQueryParams())
      delete newQuery.location

      Router.push({
        pathname: window.location.pathname,
        query: newQuery
      })
    }

    this.props.setNewLocation('current')
  }

  render() {
    const { currentLocationIsLoading, selectedLocation } = this.props
    return (
      <div className="container fade-out-when-inactive">
        {currentLocationIsLoading ? (
          <p className="location-button location-button--loading">
            <LocationIcon />
            <span>
              Geolocating<LoadingDots />
            </span>
          </p>
        ) : selectedLocation.id !== 'current' ? (
          <button
            className="location-button location-button--loaded"
            type="button"
            onClick={this.showCurrentLocation}
          >
            <LocationIcon />
            <span>Show My Location</span>
          </button>
        ) : null}
        <LocationSelect />
        <style jsx>{`
          div.container {
            position: absolute;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
          }

          .location-button {
            align-items: center;
            border-radius: 3px;
            display: inline-flex;
            font-size: 0.8em;
            background-color: white;
            margin-bottom: 5px;
            margin-left: -1.7em;
          }

          .location-button--loading {
            background-color: none;
          }

          .location-button--loaded {
            border: none;
            font-family: inherit;
            padding: 0;
            position: relative;
          }

          .location-button--loaded:hover {
            color: ${HOVER_LINK_COLOR};
            fill: ${HOVER_LINK_COLOR};
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentLocationIsLoading: getCurrentLocationIsLoading(state),
  selectedLocation: getSelectedLocation(state)
})

const mapDispatchToProps = dispatch => ({
  setNewLocation: locationId => dispatch(setNewLocation(locationId)),
  setClockDate: date => dispatch(setClockDate(date))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  LocationSelectContainer
)

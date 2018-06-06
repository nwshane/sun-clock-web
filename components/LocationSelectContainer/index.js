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
import LocationIcon from './location_icon.svg'
import LoadingDots from './LoadingDots'

class LocationSelectContainer extends React.Component {
  showCurrentLocation = () => {
    // if a url has a specified location, then we want to remove it so
    // so that a shared URL will use the default location functionality
    if (getQueryParams()) {
      const newQuery = Object.assign({}, getQueryParams())
      delete newQuery.location
      delete newQuery.date

      Router.push({
        pathname: window.location.pathname,
        query: newQuery
      })
    }
    this.props.setNewLocation('current')
    this.props.setClockDate(new Date())
  }

  render() {
    const { currentLocationIsLoading, selectedLocation } = this.props
    return (
      <div>
        <LocationSelect />
        {currentLocationIsLoading ? (
          <p className="loading-message">
            Loading Current Location<LoadingDots />
          </p>
        ) : selectedLocation.id !== 'current' ? (
          <button
            className="show-my-location"
            type="button"
            onClick={this.showCurrentLocation}
          >
            <span dangerouslySetInnerHTML={{ __html: LocationIcon }} />Show My
            Location & Time
          </button>
        ) : null}
        <style jsx>{`
          div {
            position: absolute;
            bottom: 20px;
            right: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          p.loading-message {
            font-size: 0.6em;
          }

          button.show-my-location {
            border: none;
            font-size: 0.6em;
            font-family: inherit;
          }

          button.show-my-location span {
            display: inline-block;
            width: 27px;
            vertical-align: middle;
            margin-right: 5px;
          }

          button:hover {
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

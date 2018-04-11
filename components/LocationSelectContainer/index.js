import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import LocationSelect from './LocationSelect'
import {
  getCurrentLocationIsLoading,
  getSelectedLocation
} from '~/data/getters/location'
import { setNewLocation } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'
import LocationIcon from './location_icon.svg'
import LoadingDots from './LoadingDots'

class LocationSelectContainer extends React.Component {
  showCurrentLocation = () => {
    // if a url has a specified location, then we want to remove it so
    // so that a shared URL will use the default location functionality.
    // removing the location triggers the app to update with the
    // current location, which by this point has been loaded.
    // HOWEVER, if there is no location set in the url, then
    // we have to set the new location here, because removing
    // the location from the URL will not cause the app to update.
    if (Router.query.location) {
      const newQuery = Object.assign({}, Router.query)
      delete newQuery.location

      Router.push({
        pathname: Router.pathname,
        query: newQuery
      })
    } else {
      this.props.setNewLocation('current')
    }
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
            Location
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
            font-size: 0.7em;
          }

          button.show-my-location {
            border: none;
            font-size: 0.7em;
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
  setNewLocation: locationId => dispatch(setNewLocation(locationId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  LocationSelectContainer
)

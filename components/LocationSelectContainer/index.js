import React from 'react'
import Router from 'next/router'
import { connect } from 'react-redux'
import LocationSelect from './LocationSelect'
import {
  getCurrentLocationIsLoading,
  getSelectedLocation
} from '~/data/getters/location'
import { HOVER_LINK_COLOR } from '~/data/constants'
import LocationIcon from './location_icon.svg'
import LoadingDots from './LoadingDots'

class LocationSelectContainer extends React.Component {
  showCurrentLocation = () => {
    const newQuery = Object.assign({}, Router.query)
    delete newQuery.location

    Router.push({
      pathname: Router.pathname,
      query: newQuery
    })
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

export default connect(mapStateToProps)(LocationSelectContainer)

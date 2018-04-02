import React from 'react'
import { connect } from 'react-redux'
import LocationSelect from './LocationSelect'
import {
  getCurrentLocationIsLoading,
  getSelectedLocation
} from '~/data/getters/location'
import { setNewLocation } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'
import LocationIcon from './location_icon.svg'

class LocationSelectContainer extends React.Component {
  render() {
    const {
      currentLocationIsLoading,
      showCurrentLocation,
      selectedLocation
    } = this.props
    return (
      <div>
        <LocationSelect />
        {currentLocationIsLoading ? (
          <p>Loading Location...</p>
        ) : selectedLocation.id !== 'current' ? (
          <button
            className="show-my-location"
            type="button"
            onClick={showCurrentLocation}
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
  showCurrentLocation: () => dispatch(setNewLocation('current'))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  LocationSelectContainer
)

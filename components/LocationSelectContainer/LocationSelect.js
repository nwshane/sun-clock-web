import Select from 'react-select'
import Router from 'next/router'
import 'react-select/dist/react-select.css'
import { connect } from 'react-redux'

import {
  getSelectedLocation,
  getLoadedLocations
} from '~/data/getters/location'

import { setNewLocation } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'
import EditIcon from '~/components/edit_icon.svg'

const roundCoordinate = coord => coord.toFixed(2)

class LocationSelect extends React.Component {
  handleChange = locationOption => {
    Router.push({
      pathname: Router.pathname,
      query: Object.assign({}, Router.query, { location: locationOption.value })
    })
    this.props.setNewLocation(locationOption.value)
  }

  render() {
    const { locations, selectedLocation } = this.props
    const { latitude, longitude } = selectedLocation

    if (!latitude || !longitude) return null

    return (
      <div className="outer-container" data-test="location-select-container">
        <label htmlFor="location-select">
          <span
            className="label-edit-icon"
            dangerouslySetInnerHTML={{ __html: EditIcon }}
          />
          <div>
            <Select
              id="location-select"
              name="location-select"
              value={selectedLocation.id}
              onChange={this.handleChange}
              clearable={false}
              options={Object.values(locations).map(location => ({
                value: location.id,
                label: location.name
              }))}
              backspaceRemoves={false}
              openOnFocus={true}
              arrowRenderer={null}
            />
            <ul>
              <li>Lat: {roundCoordinate(latitude)}</li>
              <li>Lon: {roundCoordinate(longitude)}</li>
            </ul>
          </div>
        </label>
        <style jsx>{`
          label {
            display: flex;
            text-align: left;
            cursor: pointer;
          }
          label:hover {
            color: ${HOVER_LINK_COLOR};
            fill: ${HOVER_LINK_COLOR};
          }
          .label-edit-icon {
            display: block;
            width: 2.3em;
          }
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            font-size: 0.6em;
            display: flex;
          }
          ul li {
            margin-right: 1em;
          }
        `}</style>
        <style jsx global>{`
          #location-select {
            background-color: none;
          }
          div.Select {
            min-width: 8em;
          }
          .Select-control {
            border: none;
            color: inherit !important;
            cursor: pointer;
            overflow-y: initial;
          }
          .Select-value {
            color: inherit !important;
            padding-left: 0 !important;
            top: 0.36em !important;
          }
          .Select-value-label {
            color: inherit !important;
          }
          .Select-input {
            padding-left: 0;
            height: 100%;
          }
          .Select-menu-outer {
            top: auto;
            bottom: 100%;
            max-height: initial;
            height: 18em;
            font-size: 0.6em;
          }
          .Select-menu {
            max-height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedLocation: getSelectedLocation(state),
  locations: getLoadedLocations(state)
})

const mapDispatchToProps = dispatch => ({
  setNewLocation: selectedLocationId =>
    dispatch(setNewLocation(selectedLocationId))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelect)

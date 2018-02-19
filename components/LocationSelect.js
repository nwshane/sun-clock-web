import Select from 'react-select'
import reactSelectStyles from 'react-select/dist/react-select.css'
import { connect } from 'react-redux'

import { getSelectedLocation, getLocations } from '~/data/getters/location'
import { setNewLocation } from '~/data/actions'

const roundCoordinate = coord => coord.toFixed(2)

class LocationSelect extends React.Component {
  handleChange = locationOption => {
    this.props.setNewLocation(locationOption.value)
  }

  render() {
    const { locations, selectedLocation } = this.props
    const { latitude, longitude } = selectedLocation

    if (!latitude || !longitude) return null

    return (
      <div>
        <Select
          name="location-select"
          value={selectedLocation.id}
          onChange={this.handleChange}
          clearable={false}
          options={Object.values(locations).map(location => ({
            value: location.id,
            label: location.name
          }))}
        />
        <ul>
          <li>Lat: {roundCoordinate(latitude)}</li>
          <li>Lon: {roundCoordinate(longitude)}</li>
        </ul>
        <style jsx>{`
          div {
            position: absolute;
            bottom: 20px;
            right: 20px;
            text-align: left;
            font-size: 16px;
          }
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }
        `}</style>
        <style global jsx>
          {reactSelectStyles}
        </style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedLocation: getSelectedLocation(state),
  locations: getLocations(state)
})

const mapDispatchToProps = dispatch => ({
  setNewLocation: selectedLocationId =>
    dispatch(setNewLocation(selectedLocationId))
})

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelect)

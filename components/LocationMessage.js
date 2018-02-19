import { connect } from 'react-redux'

import { getSelectedLatitude } from '~/data/getters/location'
import { getSelectedLongitude } from '~/data/getters/location'

const roundCoordinate = coord => coord.toFixed(2)

class LocationMessage extends React.Component {
  render() {
    const { latitude, longitude } = this.props

    if (!latitude || !longitude) return null

    return (
      <div>
        <p>Current Location</p>
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
          }
          p {
            margin: 0;
          }
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            font-size: 16px;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  latitude: getSelectedLatitude(state),
  longitude: getSelectedLongitude(state)
})

export default connect(mapStateToProps)(LocationMessage)

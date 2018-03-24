import React from 'react'
import { connect } from 'react-redux'
import LocationSelect from './LocationSelect'
import { getCurrentLocationIsLoading } from '~/data/getters/location'

class LocationSelectContainer extends React.Component {
  render() {
    const { currentLocationIsLoading } = this.props
    return (
      <div>
        <LocationSelect />
        <style jsx>{`
          div {
            position: absolute;
            bottom: 20px;
            right: 20px;
          }
        `}</style>
        {currentLocationIsLoading && <p>Loading Current Location...</p>}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentLocationIsLoading: getCurrentLocationIsLoading(state)
})

export default connect(mapStateToProps)(LocationSelectContainer)

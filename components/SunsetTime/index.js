import { connect } from 'react-redux'

import { formatToHoursMinutes } from '../../data/timeFormatters'
import { getSunsetTime } from '../../data/getters'

class SunsetTime extends React.Component {
  render() {
    return (
      <p>
        {this.props.formattedSunsetTime}
        <br /> (Sunset)
        <style jsx>{`
          p {
            position: absolute;
            top: 20px;
            right: 20px;
            margin: 0;
          }
        `}</style>
      </p>
    )
  }
}

const mapStateToProps = state => ({
  formattedSunsetTime: formatToHoursMinutes(getSunsetTime(state))
})

export default connect(mapStateToProps)(SunsetTime)

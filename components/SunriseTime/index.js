import { connect } from 'react-redux'

import { formatToHoursMinutes } from '../../data/timeFormatters'
import { getSunriseTime } from '../../data/getters'

import SunriseIcon from './sunrise_icon.svg'

class SunriseTime extends React.Component {
  render() {
    return (
      <p className="container">
        <span
          className="icon"
          dangerouslySetInnerHTML={{ __html: SunriseIcon }}
        />
        {this.props.formattedSunriseTime}
        <style jsx>{`
          .container {
            position: absolute;
            top: 20px;
            left: 20px;
            margin: 0;
          }
          .icon {
            width: 6vmin;
            display: inline-block;
            vertical-align: middle;
          }
        `}</style>
      </p>
    )
  }
}

const mapStateToProps = state => ({
  formattedSunriseTime: formatToHoursMinutes(getSunriseTime(state))
})

export default connect(mapStateToProps)(SunriseTime)

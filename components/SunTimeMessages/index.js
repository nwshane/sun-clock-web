import { connect } from 'react-redux'

import { formatToHoursMinutes } from '../../data/timeFormatters'
import { getSunriseTime } from '../../data/getters'
import { getSunsetTime } from '../../data/getters'

import SunriseIcon from './sunrise_icon.svg'
import SunsetIcon from './sunset_icon.svg'

class SunTimeMessages extends React.Component {
  render() {
    return (
      <div className="container">
        <p>
          <span
            className="icon"
            dangerouslySetInnerHTML={{ __html: SunriseIcon }}
          />
          {this.props.formattedSunriseTime}
        </p>
        <p>
          <span
            className="icon"
            dangerouslySetInnerHTML={{ __html: SunsetIcon }}
          />
          {this.props.formattedSunsetTime}
        </p>
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
          p:nth-child(2) {
            margin-top: -2.5vmin;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  formattedSunriseTime: formatToHoursMinutes(getSunriseTime(state)),
  formattedSunsetTime: formatToHoursMinutes(getSunsetTime(state))
})

export default connect(mapStateToProps)(SunTimeMessages)

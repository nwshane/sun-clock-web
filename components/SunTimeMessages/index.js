import { connect } from 'react-redux'

import { formatToHoursMinutes } from '~/data/timeFormatters'

import {
  getDaylightSeconds,
  getSunriseTime,
  getSunsetTime,
  sunIsNotRisingOrSetting
} from '~/data/getters'

import SunriseIcon from './sunrise_icon.svg'
import SunsetIcon from './sunset_icon.svg'
import DaylightMessageIcon from './DaylightMessageIcon'

const convertToReadableTimeLength = seconds => {
  const numHours = Math.floor(seconds / (60 * 60))
  const remainderMinutes = Math.round((seconds - numHours * 60 * 60) / 60)
  return `${numHours}h ${remainderMinutes}m`
}

class SunTimeMessages extends React.Component {
  render() {
    const {
      daylightTimeLength,
      formattedSunriseTime,
      formattedSunsetTime
    } = this.props

    return (
      <div className="container">
        <p>
          <span
            className="icon"
            dangerouslySetInnerHTML={{ __html: SunriseIcon }}
          />
          {formattedSunriseTime}
        </p>
        <p>
          <span
            className="icon"
            dangerouslySetInnerHTML={{ __html: SunsetIcon }}
          />
          {formattedSunsetTime}
        </p>
        <p className="daylight-container">
          <DaylightMessageIcon />
          <span className="message">{daylightTimeLength}</span>
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
          p:nth-child(3) {
            margin-top: -1.5vmin;
          }
          p:nth-child(3) .message {
            display: inline-block;
            padding-left: 0.2em;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log({ daylightSeconds: getDaylightSeconds(state) })
  return {
    formattedSunriseTime: sunIsNotRisingOrSetting(state)
      ? '--:--'
      : formatToHoursMinutes(getSunriseTime(state)),
    formattedSunsetTime: sunIsNotRisingOrSetting(state)
      ? '--:--'
      : formatToHoursMinutes(getSunsetTime(state)),
    daylightTimeLength: convertToReadableTimeLength(getDaylightSeconds(state))
  }
}

export default connect(mapStateToProps)(SunTimeMessages)

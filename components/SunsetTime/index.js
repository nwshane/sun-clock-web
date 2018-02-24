import { connect } from 'react-redux'

import { formatToHoursMinutes } from '../../data/timeFormatters'
import { getSunsetTime } from '../../data/getters'

import SunsetIcon from './sunset_icon.svg'

class SunsetTime extends React.Component {
  render() {
    return (
      <p className="container">
        <span
          className="icon"
          dangerouslySetInnerHTML={{ __html: SunsetIcon }}
        />
        {this.props.formattedSunsetTime}
        <style jsx>{`
          .container {
            position: absolute;
            top: 20px;
            right: 20px;
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
  formattedSunsetTime: formatToHoursMinutes(getSunsetTime(state))
})

export default connect(mapStateToProps)(SunsetTime)

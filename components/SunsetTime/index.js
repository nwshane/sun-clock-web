import { formatToHoursMinutes } from '../../data/timeFormatters'
import { getLocalSunsetTime } from '../../data/getters'

class SunsetTime extends React.Component {
  render() {
    return (
      <p>
        {formatToHoursMinutes(getLocalSunsetTime(this.props))}
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

export default SunsetTime

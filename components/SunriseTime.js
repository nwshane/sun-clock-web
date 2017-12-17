import { formatToHoursMinutes } from '../data/timeFormatters'
import { getLocalSunriseTime } from '../data/getters'

class SunriseTime extends React.Component {
  render() {
    return (
      <p>
        {formatToHoursMinutes(getLocalSunriseTime(this.props))}
        <br /> (Sunrise)
        <style jsx>{`
          p {
            position: absolute;
            top: 20px;
            left: 20px;
            margin: 0;
          }
        `}</style>
      </p>
    )
  }
}

export default SunriseTime

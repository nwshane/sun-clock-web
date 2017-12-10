import formatTime from '../data/formatTime'
import { getLocalSunriseTime } from '../data/getters'

class SunriseTime extends React.Component {
  render() {
    return (
      <p>
        {formatTime(getLocalSunriseTime(this.props))}
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

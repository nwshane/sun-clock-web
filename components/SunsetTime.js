import formatTime from '../data/formatTime'
import { getLocalSunsetTime } from '../data/getters'

class SunsetTime extends React.Component {
  render() {
    return (
      <p>
        {formatTime(getLocalSunsetTime(this.props))}
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

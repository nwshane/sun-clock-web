import { formatToHoursMinutes } from '../data/timeFormatters'
import { getCurrentTime } from '../data/getters'

class CurrentTime extends React.Component {
  render() {
    return (
      <p>
        {formatToHoursMinutes(getCurrentTime(this.props))}
        <style jsx>{`
          p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
            border: 1px solid black;
            background-color: white;
            padding: 2px 5px;
          }
        `}</style>
      </p>
    )
  }
}

export default CurrentTime

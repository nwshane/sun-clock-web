import formatTime from '../data/formatTime'
import { getCurrentTime } from '../data/getters'

class CurrentTime extends React.Component {
  render() {
    return (
      <p>
        {formatTime(getCurrentTime(this.props))}
        <br /> (Current Time)
        <style jsx>{`
          p {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
          }
        `}</style>
      </p>
    )
  }
}

export default CurrentTime

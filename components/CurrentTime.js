import { formatToHoursMinutes } from '../data/timeFormatters'
import { getCurrentTime } from '../data/getters'
import { connect } from 'react-redux'

class CurrentTime extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.formattedCurrentTime}</p>
        <style jsx>{`
          div {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid black;
            background-color: white;
            padding: 2px 5px;
          }
          p {
            margin: 0;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  formattedCurrentTime: formatToHoursMinutes(getCurrentTime(state))
})

export default connect(mapStateToProps)(CurrentTime)

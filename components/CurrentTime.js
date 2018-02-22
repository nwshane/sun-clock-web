import { formatToHoursMinutes } from '../data/timeFormatters'
import { getCurrentTime } from '../data/getters'
import { connect } from 'react-redux'

class CurrentTime extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.formattedCurrentTime}</p>
        <style jsx>{`
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

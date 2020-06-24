import { formatToHoursMinutes } from '../data/timeFormatters'
import { getCurrentTime } from '../data/getters'
import { connect } from 'react-redux'

class CurrentTime extends React.Component {
  render() {
    return <p>{this.props.formattedCurrentTime}</p>
  }
}

const mapStateToProps = (state) => ({
  formattedCurrentTime: formatToHoursMinutes(getCurrentTime(state)),
})

export default connect(mapStateToProps)(CurrentTime)

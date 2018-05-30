import { getLocalClockDate } from '~/data/getters'
import { connect } from 'react-redux'

class CurrentDate extends React.Component {
  render() {
    return (
      <p>
        {this.props.localClockDate.toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric'
        })}
      </p>
    )
  }
}

const mapStateToProps = state => ({
  localClockDate: getLocalClockDate(state)
})

export default connect(mapStateToProps)(CurrentDate)

import { getLocalClockDate } from '~/data/getters'
import { connect } from 'react-redux'

class CurrentDate extends React.Component {
  render() {
    return (
      <p>
        <span>
          {this.props.localClockDate.toLocaleDateString('en-US', {
            month: '2-digit'
          })}
        </span>
        <span>-</span>
        <span>
          {this.props.localClockDate.toLocaleDateString('en-US', {
            day: '2-digit'
          })}
        </span>
        <style>{`
          p {
            min-width: 2.5em;
            text-align: center;
          }
        `}</style>
      </p>
    )
  }
}

const mapStateToProps = state => ({
  localClockDate: getLocalClockDate(state)
})

export default connect(mapStateToProps)(CurrentDate)

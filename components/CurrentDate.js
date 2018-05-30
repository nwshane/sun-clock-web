import { getLocalClockDate } from '~/data/getters'
import { connect } from 'react-redux'

class CurrentDate extends React.Component {
  render() {
    return (
      <p>
        <span>
          {this.props.localClockDate.toLocaleDateString('en-US', {
            month: 'numeric'
          })}
        </span>
        <span>-</span>
        <span>
          {this.props.localClockDate.toLocaleDateString('en-US', {
            day: 'numeric'
          })}
        </span>
        <style jsx>{`
          p {
            min-width: 2em;
            text-align: center;
            display: flex;
            justify-content: space-around;
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

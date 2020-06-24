import { getLocalClockDate } from '~/data/getters'
import { connect } from 'react-redux'
import memoize from 'fast-memoize'

const memoizedToLocaleDateString = memoize((date, datePart) =>
  date.toLocaleDateString('en-US', { [datePart]: '2-digit' })
)

class CurrentDate extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { localClockDate } = this.props
    const nextLocalClockDate = nextProps.localClockDate

    return (
      localClockDate.getDate() !== nextLocalClockDate.getDate() ||
      localClockDate.getMonth() !== nextLocalClockDate.getMonth()
    )
  }

  render() {
    const { localClockDate } = this.props

    return (
      <p>
        <span>{memoizedToLocaleDateString(localClockDate, 'month')}</span>
        <span>-</span>
        <span>{memoizedToLocaleDateString(localClockDate, 'day')}</span>
        <style jsx>{`
          p {
            min-width: 2.5em;
            text-align: center;
          }
        `}</style>
      </p>
    )
  }
}

const mapStateToProps = (state) => ({
  localClockDate: getLocalClockDate(state),
})

export default connect(mapStateToProps)(CurrentDate)

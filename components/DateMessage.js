import { getClockDate } from '../data/getters'

const formatDate = date =>
  `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

class DateMessage extends React.Component {
  render() {
    return (
      <div>
        <p>Date: {formatDate(getClockDate(this.props))} (Today)</p>
        <style jsx>{`
          div {
            position: absolute;
            bottom: 20px;
            right: 20px;
          }
          p {
            margin: 0;
          }
        `}</style>
      </div>
    )
  }
}

export default DateMessage

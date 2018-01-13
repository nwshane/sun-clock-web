import { connect } from 'react-redux'

import { getClockDate } from '../data/getters'

const formatDate = date =>
  `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

class DateMessage extends React.Component {
  render() {
    return (
      <div>
        <p>Date: {this.props.formattedClockDate} (Today)</p>
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

const mapStateToProps = state => ({
  formattedClockDate: formatDate(getClockDate(state))
})

export default connect(mapStateToProps)(DateMessage)

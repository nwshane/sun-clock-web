import DatePicker from 'material-ui/DatePicker'
import { connect } from 'react-redux'

import { getClockDate } from '../data/getters'
import { setClockDateAndRetainTime } from '../data/actions'

const formatDate = date =>
  `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

class DateSelect extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(_, date) {
    this.props.setClockDateAndRetainTime(date)
  }

  render() {
    return (
      <div>
        <DatePicker
          onChange={this.handleChange}
          id="clock-date-picker"
          floatingLabelText="Clock Date:"
          value={this.props.clockDate}
        />
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
  clockDate: getClockDate(state)
})

const mapDispatchToProps = dispatch => ({
  setClockDateAndRetainTime: date => dispatch(setClockDateAndRetainTime(date))
})

export default connect(mapStateToProps, mapDispatchToProps)(DateSelect)

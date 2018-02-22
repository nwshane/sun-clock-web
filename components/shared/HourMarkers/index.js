import HourMarker from './HourMarker'
import { LocalTime } from 'js-joda'

const markerData = [
  {
    hour: 0,
    showText: true
  },
  {
    hour: 2
  },
  {
    hour: 4
  },
  {
    hour: 6,
    showText: true
  },
  {
    hour: 8
  },
  {
    hour: 10
  },
  {
    hour: 12,
    showText: true
  },
  {
    hour: 14
  },
  {
    hour: 16
  },
  {
    hour: 18,
    showText: true
  },
  {
    hour: 20
  },
  {
    hour: 22
  }
]

class HourMarkers extends React.Component {
  render() {
    return markerData.map(data => (
      <HourMarker
        key={data.hour}
        time={LocalTime.of(data.hour)}
        showText={this.props.showText && data.showText}
      />
    ))
  }
}

export default HourMarkers

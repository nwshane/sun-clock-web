import DayMarker from './DayMarker'

const markerData = [
  {
    date: new Date(1, 1, 21, 12)
  },
  {
    date: new Date(1, 2, 21, 12),
    showText: true
  },
  {
    date: new Date(1, 3, 21, 12)
  },
  {
    date: new Date(1, 4, 21, 12)
  },
  {
    date: new Date(1, 5, 21, 12),
    showText: true
  },
  {
    date: new Date(1, 6, 21, 12)
  },
  {
    date: new Date(1, 7, 21, 12)
  },
  {
    date: new Date(1, 8, 21, 12),
    showText: true
  },
  {
    date: new Date(1, 9, 21, 12)
  },
  {
    date: new Date(1, 10, 21, 12)
  },
  {
    date: new Date(1, 11, 21, 12),
    showText: true
  },
  {
    date: new Date(1, 12, 21, 12)
  }
]

class DayMarkers extends React.Component {
  render() {
    return markerData.map(data => (
      <DayMarker
        key={data.date.valueOf()}
        date={data.date}
        showText={data.showText}
      />
    ))
  }
}

export default DayMarkers

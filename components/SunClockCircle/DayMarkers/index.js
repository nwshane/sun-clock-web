import DayMarker from './DayMarker'

const markerData = [
  {
    date: new Date(1, 1, 22)
  },
  {
    date: new Date(1, 2, 22)
  },
  {
    date: new Date(1, 3, 22),
    showText: true
  },
  {
    date: new Date(1, 4, 22)
  },
  {
    date: new Date(1, 5, 22)
  },
  {
    date: new Date(1, 6, 22),
    showText: true
  },
  {
    date: new Date(1, 7, 22)
  },
  {
    date: new Date(1, 8, 22)
  },
  {
    date: new Date(1, 9, 22),
    showText: true
  },
  {
    date: new Date(1, 10, 22)
  },
  {
    date: new Date(1, 11, 22)
  },
  {
    date: new Date(1, 12, 22),
    showText: true
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

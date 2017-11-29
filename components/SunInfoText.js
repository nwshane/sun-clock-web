import CurrentStatusText from './CurrentStatusText'

const formatTime = time => time.local().format('h:mm a')

class SunInfoText extends React.Component {
  render() {
    const { sunrise, sunset, currentTime } = this.props

    if (!sunrise || !sunset || !currentTime) return null

    return (
      <div>
        <p>Sunrise: {formatTime(sunrise)}</p>
        <p>Sunset: {formatTime(sunset)}</p>
        <CurrentStatusText {...this.props} />
        <style jsx>{`
          div {
            font-size: 20px;
            padding: 0 20px;
            max-width: 200px;
          }
        `}</style>
      </div>
    )
  }
}

export default SunInfoText

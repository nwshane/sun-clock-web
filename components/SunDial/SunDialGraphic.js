const formatTime = time => time.local().format('h:mm:ss a')
class SunDialGraphic extends React.Component {
  componentDidMount() {
    console.log('sundial graphic', this.props.sunData)
  }

  render() {
    const { sunrise, sunset } = this.props
    return (
      <div>
        <p>Sunrise: {formatTime(sunrise)}</p>
        <p>Sunset: {formatTime(sunset)}</p>
      </div>
    )
  }
}

export default SunDialGraphic

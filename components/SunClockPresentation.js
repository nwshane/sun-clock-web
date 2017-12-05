class SunClockPresentation extends React.Component {
  render() {
    return (
      <div>
        <p>Sunrise: {this.props.sunrise.format('h:mm a')}</p>
        <p>Sunset: {this.props.sunset.format('h:mm a')}</p>
      </div>
    )
  }
}

export default SunClockPresentation

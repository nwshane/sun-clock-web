class SunDialGraphic extends React.Component {
  componentDidMount() {
    console.log('sundial graphic', this.props.sunData)
  }

  render() {
    return (
      <div>
        <p>Sunrise: {this.props.sunData.sunrise}</p>
        <p>Sunset: {this.props.sunData.sunset}</p>
      </div>
    )
  }
}

export default SunDialGraphic

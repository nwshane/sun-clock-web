import renderSunClockGraphic from '../data/renderSunClockGraphic'

class SunClockGraphic extends React.Component {
  constructor() {
    super()
    this.state = { sunClockGraphic: null }
  }
  componentWillReceiveProps(props) {
    if (!this.state.sunClockGraphic) return

    this.state.sunClockGraphic.update(props)
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.state.sunClockGraphic = renderSunClockGraphic(
      '.js-sunclock-graphic',
      this.props
    )
  }

  render() {
    return <div className="js-sunclock-graphic" />
  }
}

export default SunClockGraphic

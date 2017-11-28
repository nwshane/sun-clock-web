import renderSundialGraphic from '../../data/renderSundialGraphic'

class SunDialGraphic extends React.Component {
  constructor() {
    super()
    this.state = { sundialGraphic: null }
  }
  componentWillReceiveProps(props) {
    if (!this.state.sundialGraphic) return

    this.state.sundialGraphic.updateGraphicWithTime(props.currentTime)
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    this.state.sundialGraphic = renderSundialGraphic(
      '.js-sundial-graphic',
      this.props
    )
  }

  render() {
    const { sunrise, sunset } = this.props
    return <div className="js-sundial-graphic" />
  }
}

export default SunDialGraphic

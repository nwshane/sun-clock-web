import renderSundialGraphic from '../../data/renderSundialGraphic'

const updateGraphicWithTime = (sundialGraphic, currentTime) => {
  sundialGraphic.currentTimeText.text(currentTime.format('h:mm:ss a'))
}

class SunDialGraphic extends React.Component {
  constructor() {
    super()
    this.state = { sundialGraphic: null }
  }
  componentWillReceiveProps(props) {
    if (!this.state.sundialGraphic) return

    updateGraphicWithTime(this.state.sundialGraphic, props.currentTime)
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

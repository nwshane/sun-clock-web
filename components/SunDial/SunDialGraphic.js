import renderSundialGraphic from '../../data/renderSundialGraphic'

class SunDialGraphic extends React.Component {
  shouldComponentUpdate() {
    return false
  }

  componentDidMount() {
    renderSundialGraphic('.js-sundial-graphic', this.props)
  }

  render() {
    const { sunrise, sunset } = this.props
    return <div className="js-sundial-graphic" />
  }
}

export default SunDialGraphic

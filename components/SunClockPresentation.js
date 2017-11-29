import SunClockD3Container from './SunClockD3Container'
import SunInfoText from './SunInfoText'

class SunClockPresentation extends React.Component {
  render() {
    return (
      <div>
        <SunClockD3Container {...this.props} />
        <SunInfoText {...this.props} />
        <style jsx>{`
          div {
            display: flex;
            flex-flow: row wrap;
          }
        `}</style>
      </div>
    )
  }
}

export default SunClockPresentation

import SunriseTime from './SunriseTime'
import SunsetTime from './SunsetTime'
import CurrentTime from './CurrentTime'

class SunClockPresentation extends React.Component {
  render() {
    return (
      <div>
        <SunriseTime {...this.props} />
        <SunsetTime {...this.props} />
        <CurrentTime {...this.props} />
        <style jsx>{`
          div {
            font-size: 25px;
            text-align: center;
          }
        `}</style>
      </div>
    )
  }
}

export default SunClockPresentation

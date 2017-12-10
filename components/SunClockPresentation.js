import SunriseTime from './SunriseTime'
import SunsetTime from './SunsetTime'
import CurrentTime from './CurrentTime'
import SunClockCircle from './SunClockCircle'

class SunClockPresentation extends React.Component {
  render() {
    return (
      <div className="outside-container">
        <div className="inside-container">
          <SunriseTime {...this.props} />
          <SunsetTime {...this.props} />
          <CurrentTime {...this.props} />
          <SunClockCircle {...this.props} />
        </div>
        <style jsx global>{`
          html {
            width: 100vw;
            height: 100vh;
          }

          /* Hardcoding this to make svg 100% of height and width of screen
          TODO: Think of better way to do this! */
          body,
          body > div,
          body > div > div,
          body > div > div > div,
          body > div > div > div > main {
            width: 100%;
            height: 100%;
          }
        `}</style>
        <style jsx>{`
          .outside-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 25px;
            text-align: center;
          }
          .inside-container {
            position: relative;
          }
        `}</style>
      </div>
    )
  }
}

export default SunClockPresentation

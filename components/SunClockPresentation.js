import { connect } from 'react-redux'
import SunTimeMessages from './SunTimeMessages'
import CenterOfClock from '~/components/shared/CenterOfClock'
import CurrentTime from './CurrentTime'
import CurrentDate from './CurrentDate'
import LocationSelectContainer from './LocationSelectContainer'
import DateSelect from './DateSelect'
import SunClockCircle from './SunClockCircle'
import ToggleAboutOverlayButton from './ToggleAboutOverlayButton'
import AboutOverlay from './AboutOverlay'

class SunClockPresentation extends React.Component {
  render() {
    const { rateOfClockDateChange } = this.props

    return (
      <div className="outside-container">
        <div className="inside-container">
          <SunTimeMessages />
          <CenterOfClock>
            {rateOfClockDateChange < 100000 ? <CurrentTime /> : <CurrentDate />}
          </CenterOfClock>
          <LocationSelectContainer />
          <DateSelect />
          <SunClockCircle />
          <ToggleAboutOverlayButton />
          <AboutOverlay />
        </div>
        <style jsx global>{`
          html {
            width: 100vw;
            height: 100vh;
          }

          /* Hardcoding this to make svg 100% of height and width of screen
          TODO: Think of better way to do this! */
          body,
          body > div:nth-child(1),
          body > div > div:nth-child(1),
          body > div > div > main {
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
            font-size: calc(5px + 3vmin);
          }
          .inside-container {
            width: 100%;
            height: 100%;
            position: relative;
          }
        `}</style>
      </div>
    )
  }
}

export default connect(({ rateOfClockDateChange }) => ({
  rateOfClockDateChange
}))(SunClockPresentation)

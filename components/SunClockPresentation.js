import { connect } from 'react-redux'

import SunTimeMessages from './SunTimeMessages'
import CenterOfClock from '~/components/shared/CenterOfClock'
import CurrentTime from './CurrentTime'
import CurrentDate from './CurrentDate'
import LocationSelectContainer from './LocationSelectContainer'
import DateSelect from './DateSelect'
import SpeedSelect from './SpeedSelect'
import SunClockCircle from './SunClockCircle'
import ToggleAboutOverlayButton from './ToggleAboutOverlayButton'
import AboutOverlay from './AboutOverlay'
import { getOverlay, shouldShowDayCircle } from '../data/getters'

class SunClockPresentation extends React.Component {
  render() {
    const { overlay, showDayCircle } = this.props

    return (
      <div className="outside-container">
        <div className="inside-container">
          <SunTimeMessages />
          <CenterOfClock>
            {showDayCircle ? <CurrentTime /> : <CurrentDate />}
          </CenterOfClock>
          <LocationSelectContainer />
          <div className="bottom-left">
            <DateSelect />
            <SpeedSelect />
          </div>
          <SunClockCircle />
          <ToggleAboutOverlayButton />
        </div>
        {overlay === 'about' ? <AboutOverlay /> : null}
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
            overflow: hidden;
          }
          .bottom-left {
            position: absolute;
            left: 20px;
            bottom: 20px;
          }
        `}</style>
      </div>
    )
  }
}

export default connect(state => ({
  overlay: getOverlay(state),
  showDayCircle: shouldShowDayCircle(state)
}))(SunClockPresentation)

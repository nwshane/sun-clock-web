import { connect } from 'react-redux'

import { toggleAboutOverlay } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'
import { getIsDaytime } from '~/data/getters'
import { getSelectedLocation } from '~/data/getters/location'
import { getRateOfClockDateChange } from '../data/getters'
import { YEAR_CIRCLE_MIN_SPEED } from '../data/constants'

class AboutOverlay extends React.Component {
  setContentBoxRef = node => {
    this.contentBoxRef = node
  }

  handleClick = event => {
    if (this.contentBoxRef && !this.contentBoxRef.contains(event.target)) {
      this.props.toggleAboutOverlay()
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick)
  }

  render() {
    const { isDaytime, rateOfClockDateChange, selectedLocation } = this.props

    return (
      <div className="outside">
        <div>
          <div ref={this.setContentBoxRef} className="content">
            <button type="button" onClick={this.props.toggleAboutOverlay}>
              X
            </button>
            <p>Welcome to the Sun Clock!</p>
            <p>
              This little visualization shows you the length of day and night
              for a random place in the world. The clock represents the 24 hours
              of the day, and when you speed it up enough, an entire year. You
              can view different locations and dates, and you can even speed up
              the passage of time.
            </p>
            <p>
              The Sun Clock was created with {'<'}3 by{' '}
              <a href="https://nathanshane.me/">Nathan Shane</a>.
            </p>
            <div>
              <h3 className="credits-heading">Credits:</h3>
              <ul className="credits-list">
                <li>Sun icon: Jeff from the Noun Project</li>
                <li>
                  Sunrise and Sunset icons: Bryn Taylor from the Noun Project
                </li>
                <li>Daytime icon: Guilherme Furtado from the Noun Project</li>
                <li>Location icon: Arthur Shlain from the Noun Project</li>
                <li>Date icon: Gregor Cresnar from the Noun Project</li>
              </ul>
            </div>
            {selectedLocation.id === 'current' &&
              (isDaytime ? (
                <p>Now go outside and get some sun already ;) </p>
              ) : (
                <p>Now go get some sleep already ;) </p>
              ))}
          </div>
        </div>
        <style jsx>{`
          .outside {
            position: absolute;
            top: 0;
            width: 100vw;
            height: 100vh;
            z-index: 9999;
          }

          .outside > div {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.8);
            width: 100%;
            height: 100%;
          }

          .content {
            background-color: white;
            border-radius: 2px;
            box-sizing: border-box;
            font-size: 18px;
            max-width: 360px;
            padding: 20px;
          }

          .content p {
            margin: 12px 0;
          }

          button {
            float: right;
            margin: 0 0 30px 30px;
            font-size: 20px;
            border: none;
            cursor: pointer;
          }

          button:hover {
            color: ${HOVER_LINK_COLOR};
          }

          .credits-heading {
            font-size: 0.7em;
            margin: 0;
          }

          .credits-list {
            margin: 10px 0;
            font-size: 0.7em;
          }

          a {
            text-decoration: none;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isDaytime: getIsDaytime(state),
  selectedLocation: getSelectedLocation(state),
  rateOfClockDateChange: getRateOfClockDateChange(state)
})

const mapDispatchToProps = dispatch => ({
  toggleAboutOverlay: () => dispatch(toggleAboutOverlay())
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutOverlay)

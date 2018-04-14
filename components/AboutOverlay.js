import { connect } from 'react-redux'

import { toggleAboutOverlay } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'
import { getIsDaytime } from '~/data/getters'
import { getSelectedLocation } from '~/data/getters/location'

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
    const { isDaytime, selectedLocation, showOverlay } = this.props

    if (!showOverlay) return null

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
              of the day. You can change the date at the bottom left, and you
              can show your own location at the bottom right (once it loads).
            </p>
            <p>
              The Sun Clock was created with {'<'}3 by{' '}
              <a href="https://nathanshane.me/">Nathan Shane</a>.
            </p>
            <div>
              <h3 className="small-heading">Credits:</h3>
              <ul>
                <li>Sun icon: Jeff from the Noun Project</li>
                <li>
                  Sunrise and Sunset icons: Bryn Taylor from the Noun Project
                </li>
                <li>Edit icon: Jevgeni Striganov from the Noun Project</li>
                <li>Location icon: Arthur Shlain from the Noun Project</li>
              </ul>
            </div>
            {selectedLocation.id === 'current' &&
              (isDaytime ? (
                <p>Now go outside and get some sun already ;) </p>
              ) : (
                <p>Now go to sleep already ;) </p>
              ))}
          </div>
        </div>
        <style jsx>{`
          .outside {
            position: absolute;
            top: 0;
            width: 100vw;
            height: 100vh;
          }

          .outside > div {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.8);
            z-index: 9999;
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

          .small-heading {
            font-size: inherit;
            margin: 0;
          }

          ul {
            margin: 10px 0;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isDaytime: getIsDaytime(state),
  selectedLocation: getSelectedLocation(state),
  showOverlay: state.overlay === 'about'
})

const mapDispatchToProps = dispatch => ({
  toggleAboutOverlay: () => dispatch(toggleAboutOverlay())
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutOverlay)

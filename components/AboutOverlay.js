import { connect } from 'react-redux'

import { toggleAboutOverlay } from '~/data/actions'

class AboutOverlay extends React.Component {
  render() {
    if (!this.props.showOverlay) return null

    return (
      <div className="outside">
        <div>
          <div>
            <button type="button" onClick={this.props.toggleAboutOverlay}>
              X
            </button>
            <p>Welcome to the Sun Clock!</p>
            <p>
              This little visualization shows you the length of day and night
              wherever you are. The clock represents the 24 hours of the day.
              You can also change the date and the location!
            </p>
            <p>
              The Sun Clock was created with {'<'}3 by
              <a href="https://nathanshane.me/">Nathan Shane</a>.
            </p>
            <p>
              Shoutouts:
              <br />Sun icon credit: jeff from the Noun Project
              <br />
              Sunrise and Sunset icons credit: Bryn Taylor from the Noun Project
            </p>
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
            background-color: rgba(0, 0, 0, 0.4);
            z-index: 9999;
            width: 100%;
            height: 100%;
          }

          .outside > div > div {
            background-color: white;
            width: 30%;
            height: 40%;
            padding: 15px;
            font-size: 14px;
            border-radius: 2px;
          }
        `}</style>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  showOverlay: state.overlay === 'about'
})

const mapDispatchToProps = dispatch => ({
  toggleAboutOverlay: () => dispatch(toggleAboutOverlay())
})

export default connect(mapStateToProps, mapDispatchToProps)(AboutOverlay)

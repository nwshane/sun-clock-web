import { Provider } from 'react-redux'
import queryString from 'query-string'
import isEqual from 'lodash.isequal'
import 'animate.css/animate.min.css'
import ReactGA from 'react-ga'

import SunClock from '../components/SunClock'
import SunClockHead from '~/components/SunClockHead'
import createStore from '../data/createStore'

const store = createStore()

const googleAnalyticsPageView = () => {
  const pageURL = window.location.pathname + window.location.search
  if (document.location.hostname === 'sunclock.nathanshane.me') {
    ReactGA.pageview(pageURL)
  } else {
    console.log('GA page view in production', { pageURL })
  }
}

const promisifiedScript = src =>
  new Promise(function(resolve, reject) {
    var script = document.createElement('script')
    script.src = src
    script.addEventListener('load', function() {
      resolve()
    })
    script.addEventListener('error', function(e) {
      reject(e)
    })
    document.body.appendChild(script)
  })

class HomePage extends React.Component {
  state = {
    queryParams: null
  }

  updateQueryParams = () => {
    const queryParams = queryString.parse(window.location.search)

    if (!isEqual(this.state.queryParams, queryParams)) {
      this.setState({ queryParams })
      googleAnalyticsPageView()
    }
  }

  componentDidUpdate() {
    this.updateQueryParams()
  }

  loadFontError = error => {
    console.error(error)
  }

  loadGoogleFont = () => {
    window.WebFont.load({
      google: {
        families: ['Nunito']
      }
    })
  }

  componentDidMount() {
    ReactGA.initialize('UA-123799975-1')
    googleAnalyticsPageView()
    this.updateQueryParams()
    promisifiedScript(
      'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'
    )
      .then(this.loadGoogleFont)
      .catch(this.loadFontError)
  }

  render() {
    const { queryParams } = this.state
    return (
      <Provider store={store}>
        <main data-test="main">
          {queryParams && <SunClockHead />}
          {queryParams && <SunClock {...{ queryParams }} />}
          <style jsx global>{`
            html {
              width: 100vw;
              height: 100vh;
              font-family: sans-serif;
            }

            html.wf-active {
              font-family: 'Nunito', sans-serif;
            }

            /* Hardcoding this to make svg 100% of height and width of screen
          TODO: Think of better way to do this! */
            body,
            body > div:nth-child(1),
            div#__next,
            main {
              width: 100%;
              height: 100%;
            }

            body {
              margin: 0;
            }
            p {
              margin: 0;
            }

            .fade-out-when-inactive.animated {
              animation-duration: 3s;
            }

            .body-hide-cursor {
              cursor: none;
            }
          `}</style>
        </main>
      </Provider>
    )
  }
}

export default HomePage

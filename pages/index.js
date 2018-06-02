import { Provider } from 'react-redux'
import Head from 'next/head'
import queryString from 'query-string'
import isEqual from 'lodash.isequal'

import SunClock from '../components/SunClock'
import createStore from '../data/createStore'

const store = createStore()

class HomePage extends React.Component {
  state = {
    queryParams: null
  }

  updateQueryParams = () => {
    const queryParams = queryString.parse(window.location.search)

    if (!isEqual(this.state.queryParams, queryParams)) {
      this.setState({ queryParams })
    }
  }

  componentDidUpdate() {
    this.updateQueryParams()
  }

  componentDidMount() {
    this.updateQueryParams()
  }

  render() {
    const { queryParams } = this.state
    return (
      <Provider store={store}>
        <main data-test="main">
          <Head>
            <title>Sun Clock</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          {queryParams && <SunClock {...{ queryParams }} />}
          <style jsx global>{`
            body {
              margin: 0;
            }
            p {
              margin: 0;
            }
          `}</style>
        </main>
      </Provider>
    )
  }
}

export default HomePage

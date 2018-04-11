import { Provider } from 'react-redux'
import Head from 'next/head'

import SunClock from '../components/SunClock'
import createStore from '../data/createStore'

const store = createStore()

class HomePage extends React.Component {
  render() {
    const { url } = this.props
    return (
      <Provider store={store}>
        <main>
          <Head>
            <title>Sun Clock</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <SunClock queryParams={url.query} />
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

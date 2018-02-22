import { Provider } from 'react-redux'
import Head from 'next/head'

import SunClock from '../components/SunClock'
import createStore from '../data/createStore'

class HomePage extends React.Component {
  render() {
    return (
      <Provider store={createStore()}>
        <main>
          <Head>
            <title>Sun Clock</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <SunClock />
          <style jsx global>{`
            body {
              margin: 0;
            }
          `}</style>
        </main>
      </Provider>
    )
  }
}

export default HomePage

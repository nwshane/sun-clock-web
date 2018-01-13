import Head from 'next/head'
import SunClock from '../components/SunClock'
import createStore from '../data/createStore'
import { Provider } from 'react-redux'

class HomePage extends React.Component {
  render() {
    return (
      <Provider store={createStore()}>
        <main>
          <Head>
            <title>Sun Clock</title>
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

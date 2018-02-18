import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from 'react-redux'
import Head from 'next/head'

import SunClock from '../components/SunClock'
import createStore from '../data/createStore'

class HomePage extends React.Component {
  render() {
    return (
      <Provider store={createStore()}>
        <MuiThemeProvider
          muiTheme={getMuiTheme({ userAgent: (global.navigator || {}).userAgent || 'all' })}
        >
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
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default HomePage

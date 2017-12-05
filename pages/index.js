import Head from 'next/head'
import SunClock from '../components/SunClock'

class HomePage extends React.Component {
  render() {
    return (
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
    )
  }
}

export default HomePage

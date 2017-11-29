import SunClock from '../components/SunClock'

class HomePage extends React.Component {
  render() {
    return (
      <main>
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

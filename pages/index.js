import SunDial from '../components/SunDial'

class HomePage extends React.Component {
  render() {
    return (
      <main>
        <SunDial />
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

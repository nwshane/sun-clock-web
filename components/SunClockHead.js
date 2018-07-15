import { connect } from 'react-redux'
import Head from 'next/head'
import { getSelectedLocation } from '../data/getters/location'
import favicon from '~/favicon.ico'

class SunClockHead extends React.Component {
  render() {
    const { locationName } = this.props

    return (
      <Head>
        <title>
          {locationName === 'Current Location'
            ? 'Sun Clock'
            : `Sun Clock - ${locationName}`}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Head>
    )
  }
}

export default connect(state => ({
  locationName: getSelectedLocation(state).name
}))(SunClockHead)

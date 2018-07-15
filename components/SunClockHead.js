import Head from 'next/head'
import favicon from '~/favicon.ico'

export default class SunClockHead extends React.Component {
  render() {
    return (
      <Head>
        <title>Sun Clock</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
      </Head>
    )
  }
}

import { currentlyDaytime } from '../data/timeHelpers'

class CurrentStatusText extends React.Component {
  render() {
    return currentlyDaytime(this.props) ? (
      <p>It's currently daytime! Time to go outside and play!</p>
    ) : (
      <p>It's nighttime... go to sleeeeeep...</p>
    )
  }
}

export default CurrentStatusText

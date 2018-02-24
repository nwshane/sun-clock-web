import React from 'react'
import { connect } from 'react-redux'

import { toggleAboutOverlay } from '~/data/actions'

class ToggleAboutOverlayButton extends React.Component {
  render() {
    return (
      <button type="button" onClick={this.props.toggleAboutOverlay}>
        ?
        <style jsx>{`
          button {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: inherit;
          }
        `}</style>
      </button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  toggleAboutOverlay: () => dispatch(toggleAboutOverlay())
})

export default connect(null, mapDispatchToProps)(ToggleAboutOverlayButton)

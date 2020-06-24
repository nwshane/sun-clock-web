import React from 'react'
import { connect } from 'react-redux'

import { toggleAboutOverlay } from '~/data/actions'
import { HOVER_LINK_COLOR } from '~/data/constants'

class ToggleAboutOverlayButton extends React.Component {
  render() {
    return (
      <button
        className="fade-out-when-inactive"
        type="button"
        onClick={this.props.toggleAboutOverlay}
      >
        What's This?
        <style jsx>{`
          button {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: inherit;
            font-family: inherit;
            border: none;
            cursor: pointer;
          }
          button:hover {
            color: ${HOVER_LINK_COLOR};
          }
        `}</style>
      </button>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleAboutOverlay: () => dispatch(toggleAboutOverlay()),
})

export default connect(null, mapDispatchToProps)(ToggleAboutOverlayButton)

import { connect } from 'react-redux'
import {
  getArcWidth,
  getRadius,
  getCenterX,
  getCenterY,
  getHorizontalAspectOfTime,
  getVerticalAspectOfTime,
  SUN_CLOCK_CIRCLE_DIMENSION,
  getCurrentTime
} from '../../data/getters'

const getSunIconXModifier = state =>
  getHorizontalAspectOfTime(getCurrentTime(state)) * getRadius(state) * 0.99

const getSunIconYModifier = state =>
  getVerticalAspectOfTime(getCurrentTime(state)) * getRadius(state) * 0.99

const getSunIconX = state => getCenterX(state) + getSunIconXModifier(state)

const getSunIconY = state => getCenterY(state) + getSunIconYModifier(state)

class SunIcon extends React.Component {
  render() {
    const { arcWidth, sunIconX, sunIconY, dimension } = this.props
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 520.85297 647.1869624999999"
        width={arcWidth * 0.92}
        x={sunIconX - SUN_CLOCK_CIRCLE_DIMENSION / 28}
        y={sunIconY - SUN_CLOCK_CIRCLE_DIMENSION / 2.07}
        overflow="visible"
      >
        <g transform={`translate(${-0.5 * arcWidth}, ${-0.5 * arcWidth})`}>
          <path
            d="m 260.49299,0 -45.914,46.3192 -60.768,-23.7673 -22.957,61.0381 -64.954995,2.9726 3.782,64.9555 L 11.344,180.6864 41.322,238.6192 0,288.9902 l 50.91,40.7819 -17.285,62.7936 63.063995,16.4756 9.858005,64.4142 64.27999,-10.5327 35.11,54.8268 54.42201,-35.7865 54.42099,35.7865 35.246,-54.8268 64.279,10.5327 9.85801,-64.4142 63.065,-16.4756 -17.286,-62.7936 50.911,-40.7819 -41.458,-50.371 30.115,-57.9328 -58.338,-29.1683 3.913,-64.9555 L 389.861,83.59 366.904,22.5519 306.27,46.3192 260.49,0 Z m 0,73.4619 c 103.919,0 188.113,84.193 188.113,188.1126 0,103.9189 -84.194,188.247 -188.113,188.247 -103.919,0 -188.111995,-84.3281 -188.111995,-188.247 0,-103.9196 84.192995,-188.1126 188.111995,-188.1126 z m 0,28.4937 c -88.086,0 -159.618,71.5329 -159.618,159.6189 0,88.1546 71.463,159.6182 159.618,159.6182 88.15501,0 159.619,-71.4636 159.619,-159.6182 -0.07,-88.086 -71.464,-159.6189 -159.619,-159.6189 z"
            clipRule="evenodd"
            fillRule="evenodd"
          />
        </g>
      </svg>
    )
  }
}

const mapStateToProps = state => ({
  arcWidth: getArcWidth(state),
  sunIconX: getSunIconX(state),
  sunIconY: getSunIconY(state)
})

export default connect(mapStateToProps)(SunIcon)

import {
  SUN_CLOCK_CIRCLE_DIMENSION,
  SUN_CLOCK_RADIUS,
  SUN_CLOCK_ARC_WIDTH,
  SUN_CLOCK_CENTER_X,
  SUN_CLOCK_CENTER_Y,
  DAYLIGHT_ARC_COLOR,
  NIGHTTIME_ARC_COLOR
} from '~/data/constants'

import Arc from '~/components/shared/Arc'
import HourMarkers from '~/components/shared/HourMarkers'

class LoadingCircle extends React.Component {
  render() {
    return (
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SUN_CLOCK_CIRCLE_DIMENSION} ${
          SUN_CLOCK_CIRCLE_DIMENSION
        }`}
      >
        <Arc
          {...{
            dimension: SUN_CLOCK_CIRCLE_DIMENSION,
            color: DAYLIGHT_ARC_COLOR,
            radius: SUN_CLOCK_RADIUS,
            arcWidth: SUN_CLOCK_ARC_WIDTH,
            centerX: SUN_CLOCK_CENTER_X,
            centerY: SUN_CLOCK_CENTER_Y,
            startAngle: 270,
            endAngle: 90
          }}
        />
        <Arc
          {...{
            dimension: SUN_CLOCK_CIRCLE_DIMENSION,
            color: NIGHTTIME_ARC_COLOR,
            radius: SUN_CLOCK_RADIUS,
            arcWidth: SUN_CLOCK_ARC_WIDTH,
            centerX: SUN_CLOCK_CENTER_X,
            centerY: SUN_CLOCK_CENTER_Y,
            startAngle: 90,
            endAngle: 270
          }}
        />
        <HourMarkers />
      </svg>
    )
  }
}

export default LoadingCircle

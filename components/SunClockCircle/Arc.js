import standardizeAngle from '../../data/standardizeAngle'

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  }
}

function isLargeArc(startAngle, endAngle) {
  return standardizeAngle(endAngle) - standardizeAngle(startAngle) <= 180
    ? '0'
    : '1'
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle)
  const end = polarToCartesian(x, y, radius, startAngle)

  // prettier-ignore
  const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, isLargeArc(startAngle, endAngle), 0, end.x, end.y
    ].join(" ");

  return d
}

const getCenterX = dimension => dimension / 2
const getCenterY = dimension => dimension / 2
const getRadius = dimension => dimension / 2.4
const getArcWidth = dimension => getRadius(dimension) / 4

class Arc extends React.Component {
  render() {
    const { color, dimension, startAngle, endAngle } = this.props

    return (
      <g>
        <path
          d={describeArc(
            getCenterX(dimension),
            getCenterY(dimension),
            getRadius(dimension),
            startAngle,
            endAngle
          )}
        />
        <style jsx>{`
          path {
            fill: none;
            stroke-width: ${getArcWidth(dimension)};
            stroke: ${color};
          }
        `}</style>
      </g>
    )
  }
}

export default Arc

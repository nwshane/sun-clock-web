// Useful explanation of the trigonometry in this file:
// https://www.mathsisfun.com/sine-cosine-tangent.html

import {
  getCenterX,
  getCenterY,
  getClockInnerRadius,
  getAngleForTime
} from './getters'

const getAngleForTimeRadians = time => getAngleForTime(time) * (Math.PI / 180)

const getMarkerInnerRadius = dimension => getClockInnerRadius(dimension) / 1.05

const getCenterXOuterModifier = ({ dimension, time }) =>
  Math.sin(getAngleForTimeRadians(time)) * getClockInnerRadius(dimension)

const getCenterXInnerModifier = ({ dimension, time }) =>
  Math.sin(getAngleForTimeRadians(time)) * getMarkerInnerRadius(dimension)

const getX1 = ({ dimension, time }) => {
  console.log('cx', getCenterX(dimension))
  console.log('cx modifier', getCenterXOuterModifier({ dimension, time }))
  return getCenterX(dimension) + getCenterXOuterModifier({ dimension, time })
}

const getX2 = ({ dimension, time }) =>
  getCenterX(dimension) + getCenterXInnerModifier({ dimension, time })

const getCenterYOuterModifier = ({ dimension, time }) =>
  Math.cos(getAngleForTimeRadians(time)) * getClockInnerRadius(dimension)

const getCenterYInnerModifier = ({ dimension, time }) =>
  Math.cos(getAngleForTimeRadians(time)) * getMarkerInnerRadius(dimension)

const getY1 = ({ dimension, time }) =>
  getCenterY(dimension) + getCenterYOuterModifier({ dimension, time })

const getY2 = ({ dimension, time }) =>
  getCenterY(dimension) + getCenterYInnerModifier({ dimension, time })

const getHourMarkerLineCoords = (dimension, time) => ({
  x1: getX1({ dimension, time }),
  y1: getY1({ dimension, time }),
  x2: getX2({ dimension, time }),
  y2: getY2({ dimension, time })
})

export default getHourMarkerLineCoords

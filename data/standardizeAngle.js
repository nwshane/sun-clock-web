export default function standardizeAngle(angle) {
  if (angle >= 360) {
    return angle - Math.floor(angle / 360) * 360
  } else if (angle < 0) {
    return angle + Math.ceil(angle / -360) * 360
  } else {
    return angle
  }
}

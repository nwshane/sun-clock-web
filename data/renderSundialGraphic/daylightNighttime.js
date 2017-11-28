const getTimeUntil = momentInstance =>
  momentInstance.local().hours() * 60 * 60 * 1000 +
  momentInstance.local().minutes() * 60 * 1000 +
  momentInstance.local().seconds() * 1000

const millisecondsInDay = 24 * 60 * 60 * 1000

export const getDaylightMilliseconds = (sunrise, sunset) =>
  getTimeUntil(sunset) - getTimeUntil(sunrise)

export const getNighttimeMilliseconds = (sunrise, sunset) =>
  millisecondsInDay - getDaylightMilliseconds(sunrise, sunset)

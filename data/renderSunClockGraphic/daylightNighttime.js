const timeInMilliseconds = momentInstance =>
  momentInstance.local().hours() * 60 * 60 * 1000 +
  momentInstance.local().minutes() * 60 * 1000 +
  momentInstance.local().seconds() * 1000

const millisecondsInDay = 24 * 60 * 60 * 1000

const wrapMilliseconds = milliseconds =>
  milliseconds > 0 ? milliseconds : milliseconds + millisecondsInDay

// Number of milliseconds from time1 until time2. Always positive;
// if time2 is before time1, then continues around the clock
const getMillisecondsBetween = (time1, time2) =>
  wrapMilliseconds(timeInMilliseconds(time2) - timeInMilliseconds(time1))

export const getProportionOfDayBetween = (time1, time2) =>
  getMillisecondsBetween(time1, time2) / millisecondsInDay

export const getDaylightMilliseconds = (sunrise, sunset) =>
  timeInMilliseconds(sunset) - timeInMilliseconds(sunrise)

export const getNighttimeMilliseconds = (sunrise, sunset) =>
  millisecondsInDay - getDaylightMilliseconds(sunrise, sunset)

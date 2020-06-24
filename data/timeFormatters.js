// Using custom time formatters for now, because it's unclear how you can
// format times in js-joda
// See issue: https://github.com/js-joda/js-joda/issues/207

const get12HourNum = (time) => {
  const hour = time.hour()
  if (hour === 0) return 12
  if (hour > 12) return hour - 12
  return hour
}

const padMinutes = (time) => {
  const minute = time.minute()

  if (minute < 10) return `0${minute.toString()}`

  return minute
}

const getAmPm = (time) => (time.hour() < 12 ? 'am' : 'pm')

export const formatToHoursMinutes = (time) =>
  `${get12HourNum(time)}:${padMinutes(time)} ${getAmPm(time)}`

export const formatToHours = (time) => `${get12HourNum(time)} ${getAmPm(time)}`

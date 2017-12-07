import mapValues from 'lodash.mapvalues'
import { LocalTime } from 'js-joda'

// sunrise-sunset.org api includes a
const isTimeLength = str => !str.includes('AM') && !str.includes('PM')

const timePattern = /(\d\d?):(\d\d):(\d\d)/

const get24HourValue = (str, hours) => {
  // 1 pm -> 13
  // 11 pm -> 23
  if (/PM/.test(str) && hours < 12) return hours + 12

  // midnight -> 0
  if (/AM/.test(str) && hours === 12) return 0

  // 1 am -> 1
  // 11 am -> 11
  return hours
}

const getTimeComponents = str => ({
  hours: get24HourValue(str, parseInt(str.match(timePattern)[1])),
  minutes: parseInt(str.match(timePattern)[2]),
  seconds: parseInt(str.match(timePattern)[3])
})

const transformStrToLocalTime = str => {
  if (isTimeLength(str)) return str
  const { hours, minutes, seconds } = getTimeComponents(str)

  return LocalTime.of(hours, minutes, seconds)
}

export default sunDataResponseResults =>
  mapValues(sunDataResponseResults, transformStrToLocalTime)

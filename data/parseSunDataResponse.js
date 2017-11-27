import mapValues from 'lodash.mapvalues'
import moment from 'moment'

// sunrise-sunset.org api includes a
const isTimeLength = str => !str.includes('AM') && !str.includes('PM')

const convertTimeToMoment = str => {
  if (isTimeLength(str)) return str
  return moment.utc(str, 'hh:mm:ss a')
}

export default sunDataResponseResults =>
  mapValues(sunDataResponseResults, convertTimeToMoment)

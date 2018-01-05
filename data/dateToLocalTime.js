import { Instant, LocalTime } from 'js-joda'

export default date => LocalTime.ofInstant(Instant.ofEpochMilli(date.getTime()))

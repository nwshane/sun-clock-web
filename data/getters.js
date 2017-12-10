const getUTCSunrise = state => state.sunrise
const getUTCSunset = state => state.sunset

const adjustUTCToLocalTime = time =>
  time.minusMinutes(new Date().getTimezoneOffset())

export const getLocalSunriseTime = state =>
  adjustUTCToLocalTime(getUTCSunrise(state))

export const getLocalSunsetTime = state =>
  adjustUTCToLocalTime(getUTCSunset(state))

export const getCurrentTime = state => state.currentTime

const https = require('https')

const fetchData = (url) => (
  new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.on('data', (data) => {
        resolve(JSON.parse(data))
      })
    }).on('error', (e) => {
      reject(e)
    })
  })
)

const getGeoDataAPIUrl = () => (
  'https://ipvigilante.com/'
)

async function getGeoData() {
  console.log('Determining your location based on your IP address...')

  const response = await fetchData(getGeoDataAPIUrl())

  const { data } = response
  const { country_name } = data

  console.log(`
    Got your location!
    You're currently in the country ${country_name}.
  `)

  return data
}

const getSunDataAPIUrl = ({ latitude, longitude }) => (
  `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
)

async function getSunData(geoData) {
  console.log('Finding sunrise and sunset times for your current latitude and longitude...')

  const response = await fetchData(getSunDataAPIUrl(geoData))

  return response.results
}

const get12HourClockHours = (date) => (
  date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
)

const getAmOrPm = (date) => (
  date.getHours() > 12 ? 'PM' : 'AM'
)

const formatDate = (date, formatString) => (
  formatString
  .replace('%I', get12HourClockHours(date))
  .replace('%M', date.getMinutes())
  .replace('%S', date.getSeconds())
  .replace('%p', getAmOrPm(date))
)

const getTimeStamp = (date) => (
  formatDate(date, '%I:%M:%S %p')
)

const adjustTimeStamp = (timeStamp) => {
  console.log(timeStamp)
  const now = new Date(Date.now())
  const utcDateString = `${now.toDateString()} ${timeStamp} UTC`
  const adjustedTimeStamp = getTimeStamp(new Date(utcDateString))
  console.log(adjustedTimeStamp)
  return adjustedTimeStamp
}

const timeStampRepresentsTimeOfDay = (timeStamp) => (
  /(AM|PM)/.test(timeStamp)
)

const adjustSunDataForTimeZone = (sunData) => (
  Object.keys(sunData).reduce((newSunData, key) => {
    console.log(key)
    if (timeStampRepresentsTimeOfDay(sunData[key])) {
      newSunData[key] = adjustTimeStamp(sunData[key])
    } else {
      newSunData[key] = sunData[key]
    }
    return newSunData
  }, {})
)

const formatSunData = ({sunrise, sunset, day_length}) => (
  `
    Sunrise: ${sunrise}
    Sunset: ${sunset}
    Day Length: ${day_length}
  `
)

async function outputSunTimes() {
  console.log('Fetching sunrise and sunset time for your current location...')

  try {
    console.log(
      formatSunData(
        adjustSunDataForTimeZone(
          await getSunData(
            await getGeoData()
          )
        )
      )
    )
  } catch(e) {
    throw e
  }
}

outputSunTimes()

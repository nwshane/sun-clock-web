const https = require('https')

let options = {}

const defaultOptions = {
  verbose: false
}

const verboseLogging = () => options.verbose

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
  if (verboseLogging()) console.log('\n↻ Determining your location based on your IP address...')

  const response = await fetchData(getGeoDataAPIUrl())

  const { data } = response
  const { country_name } = data

  if (verboseLogging()) console.log(`✓ Got your location! You're currently in the country ${country_name}.`)

  return data
}

const getSunDataAPIUrl = ({ latitude, longitude }) => (
  `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
)

async function getSunData(geoData) {
  if (verboseLogging()) console.log('\n↻ Finding sunrise and sunset times for your current latitude and longitude...')

  const response = await fetchData(getSunDataAPIUrl(geoData))

  if (verboseLogging()) console.log('✓ Got times for sunrise and sunset at your location!')

  return response.results
}

const get12HourClockHours = (date) => (
  date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
)

const getAmOrPm = (date) => (
  date.getHours() > 12 ? 'PM' : 'AM'
)

const get0PaddedNumber = (number) => (
  number >= 10 ? number : `0${number}`
)

const formatDate = (date, formatString) => (
  formatString
  .replace('%I', get12HourClockHours(date))
  .replace('%M', get0PaddedNumber(date.getMinutes()))
  .replace('%S', get0PaddedNumber(date.getSeconds()))
  .replace('%p', getAmOrPm(date))
)

const getTimeStamp = (date) => (
  formatDate(date, '%I:%M:%S %p')
)

const getCurrentDate = () => (new Date(Date.now()))

const getUtcDateString = (timeStamp) => (
  `${getCurrentDate().toDateString()} ${timeStamp} UTC`
)

const adjustTimeStamp = (timeStamp) => (
  getTimeStamp(new Date(getUtcDateString(timeStamp)))
)

const timeStampRepresentsTimeOfDay = (timeStamp) => (
  /(AM|PM)/.test(timeStamp)
)

const adjustSunDataForTimeZone = (sunData) => {
  if (verboseLogging()) console.log('\n↻ Adjusting times from UTC to your current time zone...')

  return Object.keys(sunData).reduce((newSunData, key) => {
    if (timeStampRepresentsTimeOfDay(sunData[key])) {
      newSunData[key] = adjustTimeStamp(sunData[key])
      if (verboseLogging()) console.log(`✓ Adjusted ${key} from ${sunData[key]} to ${newSunData[key]}`)
    } else {
      newSunData[key] = sunData[key]
    }
    return newSunData
  }, {})
}

const formatSunData = ({sunrise, sunset, day_length}) => (
  `
    Sunrise: ${sunrise}
    Sunset: ${sunset}
    Day Length: ${day_length}
  `
)

const getOptions = (args) => {
  const verbose = args.includes('--verbose')

  return Object.assign(
    {},
    defaultOptions,
    { verbose }
  )
}

const getCommandLineArgs = () => {
  const [,,...args] = process.argv
  return args
}

async function getAdjustedSunData() {
  return (
    adjustSunDataForTimeZone(
      await getSunData(
        await getGeoData()
      )
    )
  )
}

async function outputSunTimes() {
  return console.log(formatSunData(await getAdjustedSunData()))
}

const runSunTimes = () => {
  options = getOptions(getCommandLineArgs())
  if (verboseLogging()) console.log('Invoked sunTimes script with options:', options, '\n')

  try {
    outputSunTimes()
  } catch(e) {
    throw e
  }
}

runSunTimes()

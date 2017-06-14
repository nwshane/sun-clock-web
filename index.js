// Tested with node v8.0.0
const https = require('https')

const exitWithError = (error, message) => {
  if (message) console.log('\n', message)
  console.log('\n', error)
  console.log('\nExiting sunTimes script. Sorry!')
  process.exit()
}

/* Command Line Args and Options */

let options = {}

const defaultOptions = {
  verbose: false
}

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

const verboseLogging = () => options.verbose

// Sends http request to URL and resolves Promise with JSON-parsed
// response data
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

/* Geographical Data API */

const getGeoDataAPIUrl = () => (
  'https://ipvigilante.com/'
)

async function getGeoData() {
  if (verboseLogging()) console.log('\n↻ Determining your location based on your IP address...')

  let response

  try {
    response = await fetchData(getGeoDataAPIUrl())
  } catch(e) {
    exitWithError(e, `Failed to fetch Geographical Data from URL: ${getGeoDataAPIUrl()}`)
  }

  const { data } = response
  const { country_name } = data

  if (verboseLogging()) console.log(`✓ Got your location! You're currently in the country ${country_name}.`)

  return data
}

/* Sunrise and Sunset Data API */

const getSunDataAPIUrl = ({ latitude, longitude }) => (
  `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`
)

async function getSunData(geoData) {
  if (verboseLogging()) console.log('\n↻ Finding sunrise and sunset times for your current latitude and longitude...')
  const url = getSunDataAPIUrl(geoData)

  let response
  try {
    response = await fetchData(url)
  } catch(e) {
    exitWithError(e, `Failed to fetch Sun Data from URL: ${url}`)
  }

  if (verboseLogging()) console.log('✓ Got times for sunrise and sunset at your location!')

  return response.results
}

/*
  Date Formatters

  Use date specification described here: http://www.opengroup.org/onlinepubs/007908799/xsh/strftime.html

  Note: Only implemented parts of the above specification here. The goal
  in this script is to have no external dependencies; otherwise it would
  usually make sense to format dates with a library like moment JS.
*/

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

/* Adjusting Time Stamps from UTC to Local Time Zone */

const getCurrentDate = () => (new Date(Date.now()))

const getUtcDateString = (timeStamp) => (
  `${getCurrentDate().toDateString()} ${timeStamp} UTC`
)

// new Date('bla bla UTC') will convert the "bla bla" date/time to
// the local time zone.
// Source: https://stackoverflow.com/questions/13622142/javascript-to-convert-utc-to-local-time
const adjustTimeStamp = (timeStamp) => (
  getTimeStamp(new Date(getUtcDateString(timeStamp)))
)

// Naive implementation, but it works because all times of day
// returned by Sunrise Sunset API include AM or PM
const timeStampRepresentsTimeOfDay = (timeStamp) => (
  /(AM|PM)/.test(timeStamp)
)

const adjustSunDataToLocalTimeZone = (sunData) => {
  if (verboseLogging()) console.log('\n↻ Adjusting times from UTC to your current time zone...')

  return Object.keys(sunData).reduce((newSunData, key) => {
    // Only adjust time stamps representing times of day (i.e. do not
    // change day_length)
    if (timeStampRepresentsTimeOfDay(sunData[key])) {
      newSunData[key] = adjustTimeStamp(sunData[key])

      if (verboseLogging()) console.log(`✓ Adjusted ${key} from ${sunData[key]} to ${newSunData[key]}`)
    } else {
      newSunData[key] = sunData[key]
    }
    return newSunData
  }, {})
}

/* Main Functions in Script */

const formatSunData = ({sunrise, sunset, day_length}) => (
  `
    Sunrise: ${sunrise}
    Sunset: ${sunset}
    Day Length: ${day_length}
  `
)

async function getAdjustedSunData() {
  return (
    adjustSunDataToLocalTimeZone(
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

  outputSunTimes()
}

runSunTimes()

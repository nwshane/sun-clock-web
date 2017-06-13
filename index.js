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

const formatSunData = ({sunrise, sunset}) => (
  `
    Sunrise: ${sunrise}
    Sunset: ${sunset}
  `
)

async function outputSunTimes() {
  console.log('Fetching sunrise and sunset time for your current location...')

  try {
    console.log(formatSunData(await getSunData(await getGeoData())))
  } catch(e) {
    throw e
  }
}

outputSunTimes()

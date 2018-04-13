require('dotenv').config()
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const locationWikipediaUrls = [
  'https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_A-H',
  'https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_I-P',
  'https://en.wikipedia.org/wiki/Latitude_and_longitude_of_cities,_Q-Z'
]

const getCountry = $row =>
  $row
    .children('td')
    .eq(0)
    .text()

const getCity = $row =>
  $row
    .children('td')
    .eq(1)
    .text()

const mapLatitudeTextToNum = latitudeText => {
  const match = latitudeText.match(/(\d+)°(\d+).*(N|S)/)
  const degrees = parseInt(match[1])
  const minutes = parseInt(match[2])
  const modifier = match[3] === 'N' ? 1 : -1
  return (degrees + minutes / 60) * modifier
}

const mapLongitudeTextToNum = longitudeText => {
  const match = longitudeText.match(/(\d+)°(\d+).*(W|E)/)
  const degrees = parseInt(match[1])
  const minutes = parseInt(match[2])
  const modifier = match[3] === 'E' ? 1 : -1
  return (degrees + minutes / 60) * modifier
}

const getLatitude = $row => mapLatitudeTextToNum($row.find('.latitude').text())
const getLongitude = $row =>
  mapLongitudeTextToNum($row.find('.longitude').text())

const mapRowToData = $row => ({
  name: `${getCity($row)} (${getCountry($row)})`,
  latitude: getLatitude($row),
  longitude: getLongitude($row)
})

const getLocationsWithoutTimeZones = async url => {
  const pageHtml = (await axios(url)).data

  const $ = cheerio.load(pageHtml)
  const locationsArray = $('table.wikitable tbody tr')
    .map((index, row) => (index === 0 ? null : mapRowToData($(row))))
    .get()

  return locationsArray.reduce((acc, location) => {
    const id = encodeURIComponent(
      location.name
        .replace(/\(/, '')
        .replace(/\)/, '')
        .replace(/\s/g, '_')
    )
    location.id = id
    acc[id] = location
    return acc
  }, {})
}

const getAllLocationsWithoutTimeZones = async () => {
  return Object.assign(
    {},
    await getLocationsWithoutTimeZones(locationWikipediaUrls[0]),
    await getLocationsWithoutTimeZones(locationWikipediaUrls[1]),
    await getLocationsWithoutTimeZones(locationWikipediaUrls[2])
  )
}

const fetchTimeZone = async location => {
  const { latitude, longitude } = location

  const geonamesResponse = await axios(
    `http://api.geonames.org/timezoneJSON?lat=${latitude}&lng=${
      longitude
    }&username=${process.env.GEONAMES_USERNAME}`
  )

  return geonamesResponse.data.timezoneId
}

const addTimeZones = async locations => {
  let requestCount = 0

  for (const locationKey in locations) {
    // if (requestCount > 4) break
    const remainingRequests = Object.keys(locations).length - requestCount

    if (remainingRequests % 20 === 0)
      console.log(`remaining timezone requests: ${remainingRequests}`)

    const location = locations[locationKey]
    location.timeZone = await fetchTimeZone(location)

    if (!location.timeZone) {
      console.log(
        'could not find timezone for location; removing from list',
        location
      )
      delete locations[locationKey]
    }

    requestCount = requestCount + 1
  }

  return locations
}

const getLocations = async () =>
  addTimeZones(await getAllLocationsWithoutTimeZones())

const writeLocations = locations => {
  fs.writeFileSync('tmp/locations.json', JSON.stringify(locations, null, 2))
}

const main = async () => {
  writeLocations(await getLocations())
}

main()

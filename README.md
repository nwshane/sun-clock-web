A command line app for getting the sunset and sunrise times at your current location.

## Usage

```
// Tested with node v8.0.0
node index.js

// Want to watch the script do its magic?
node index.js --verbose
```

## Notes

- No dependencies besides the native `https` node module
- All code is kept in one file so that it can be easily downloaded and run by a user, even without cloning the repository.

## Thanks to these APIs...

- [IP Vigilante](https://www.ipvigilante.com/) for geographical data based on user's IP address
- [Sunrise Sunset] https://sunrise-sunset.org/api for sunrise and sunset times based on a given latitude and longitude

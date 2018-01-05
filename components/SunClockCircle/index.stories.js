import SunClockCircle from './'
import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'

storiesOf('SunClockCircle', module)
  .add('with long daylight hours', () => (
    <SunClockCircle
      sunriseLocalTime={LocalTime.of(3, 8, 1)}
      sunsetLocalTime={LocalTime.of(20, 55, 20)}
      dimension={500}
      clockDate={new Date(1970, 1, 1, 14, 2, 1)}
    />
  ))
  .add('with long nighttime hours', () => (
    <SunClockCircle
      sunriseLocalTime={LocalTime.of(9, 32, 1)}
      sunsetLocalTime={LocalTime.of(17, 5, 20)}
      dimension={500}
      clockDate={new Date(1970, 1, 1, 3, 2, 1)}
    />
  ))
  .add('with large dimensions and rising sun', () => (
    <SunClockCircle
      sunriseLocalTime={LocalTime.of(6, 55, 1)}
      sunsetLocalTime={LocalTime.of(15, 20, 38)}
      dimension={1200}
      clockDate={new Date(1970, 1, 1, 7, 2, 1)}
    />
  ))
  .add('with small dimensions and setting sun', () => (
    <SunClockCircle
      sunriseLocalTime={LocalTime.of(2, 47, 1)}
      sunsetLocalTime={LocalTime.of(16, 40, 38)}
      dimension={300}
      clockDate={new Date(1970, 1, 1, 16, 35, 1)}
    />
  ))

import SunClockCircle from './'
import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'

storiesOf('SunClockCircle', module)
  .add('with long daylight hours', () => (
    <SunClockCircle
      sunriseLocalTime={LocalTime.of(3, 8, 1)}
      sunsetLocalTime={LocalTime.of(20, 55, 20)}
      dimension={500}
      currentTime={LocalTime.of(14, 2, 1)}
    />
  ))
  .add('with long nighttime hours', () => (
    <SunClockCircle
      sunriseLocalTime={LocalTime.of(9, 32, 1)}
      sunsetLocalTime={LocalTime.of(17, 5, 20)}
      dimension={500}
      currentTime={LocalTime.of(3, 2, 1)}
    />
  ))

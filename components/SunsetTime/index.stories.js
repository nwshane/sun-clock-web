import SunsetTime from './'
import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'

storiesOf('SunsetTime', module).add('with late night time', () => (
  <SunsetTime sunsetLocalTime={LocalTime.of(23, 3, 57)} />
))

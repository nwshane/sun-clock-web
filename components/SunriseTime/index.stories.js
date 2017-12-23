import SunriseTime from './'
import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'

storiesOf('SunriseTime', module).add('with morning time', () => (
  <SunriseTime sunriseLocalTime={LocalTime.of(2, 30, 23)} />
))

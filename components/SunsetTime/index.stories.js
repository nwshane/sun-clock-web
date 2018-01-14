import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'
import { Provider } from 'react-redux'

import SunsetTime from './'
import createStore from '../../data/createStore'

storiesOf('SunsetTime', module).add('with late night time', () => (
  <Provider store={createStore({ sunsetLocalTime: LocalTime.of(23, 3, 57) })}>
    <SunsetTime />
  </Provider>
))

import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'
import { Provider } from 'react-redux'

import SunriseTime from './'
import createStore from '../../data/createStore'

storiesOf('SunriseTime', module).add('with early morning time', () => (
  <Provider store={createStore({ sunriseLocalTime: LocalTime.of(2, 30, 23) })}>
    <SunriseTime />
  </Provider>
))

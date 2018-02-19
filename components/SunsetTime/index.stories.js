import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'
import { Provider } from 'react-redux'

import SunsetTime from './'
import createStore from '../../data/createStore'

storiesOf('SunsetTime', module).add('with late night time', () => (
  <Provider
    store={createStore({ sunsetDate: new Date(1970, 1, 1, 23, 3, 57) })}
  >
    <SunsetTime />
  </Provider>
))

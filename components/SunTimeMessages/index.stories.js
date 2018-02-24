import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'
import { Provider } from 'react-redux'

import SunTimeMessages from './'
import createStore from '../../data/createStore'

storiesOf('SunTimeMessages', module).add('with early morning time', () => (
  <Provider
    store={createStore({
      sunriseDate: new Date(1970, 1, 1, 2, 30, 23),
      sunsetDate: new Date(1970, 1, 1, 23, 3, 57)
    })}
  >
    <SunTimeMessages />
  </Provider>
))

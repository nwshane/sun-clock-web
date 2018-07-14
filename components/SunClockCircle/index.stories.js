import { storiesOf } from '@storybook/react'
import { LocalTime } from 'js-joda'
import { Provider } from 'react-redux'

import SunClockCircle from './'
import createStore from '../../data/createStore'

storiesOf('SunClockCircle', module)
  .add('at 2:02 pm with long daylight hours', () => (
    <Provider
      store={createStore({
        sunriseDate: new Date(1970, 1, 1, 3, 8, 1),
        sunsetDate: new Date(1970, 1, 1, 20, 55, 20),
        clockDate: new Date(1970, 1, 1, 14, 2, 1)
      })}
    >
      <SunClockCircle />
    </Provider>
  ))
  .add('at 3:02 am with long nighttime hours', () => (
    <Provider
      store={createStore({
        sunriseDate: new Date(1970, 1, 1, 9, 32, 1),
        sunsetDate: new Date(1970, 1, 1, 17, 5, 20),
        clockDate: new Date(1970, 1, 1, 3, 2, 1)
      })}
    >
      <SunClockCircle />
    </Provider>
  ))
  .add('at 7:02 am with rising sun', () => (
    <Provider
      store={createStore({
        sunriseDate: new Date(1970, 1, 1, 6, 55, 1),
        sunsetDate: new Date(1970, 1, 1, 15, 20, 38),
        clockDate: new Date(1970, 1, 1, 7, 2, 1)
      })}
    >
      <SunClockCircle />
    </Provider>
  ))
  .add('at 4:35 pm with setting sun and speed 127617', () => (
    <Provider
      store={createStore({
        sunriseDate: new Date(1970, 1, 1, 2, 47, 1),
        sunsetDate: new Date(1970, 1, 1, 16, 40, 38),
        clockDate: new Date(1970, 1, 1, 16, 35, 1),
        rateOfClockDateChange: 127617
      })}
    >
      <SunClockCircle />
    </Provider>
  ))
  .add('on January 1st with speed 127618', () => (
    <Provider
      store={createStore({
        sunriseDate: new Date(1970, 1, 1, 2, 47, 1),
        sunsetDate: new Date(1970, 1, 1, 16, 40, 38),
        clockDate: new Date(1970, 0, 1, 16, 35, 1),
        rateOfClockDateChange: 127618
      })}
    >
      <SunClockCircle />
    </Provider>
  ))
  .add('on June 20 with speed 127618', () => (
    <Provider
      store={createStore({
        sunriseDate: new Date(1970, 1, 1, 2, 47, 1),
        sunsetDate: new Date(1970, 1, 1, 16, 40, 38),
        clockDate: new Date(1970, 5, 20, 16, 35, 1),
        rateOfClockDateChange: 127618
      })}
    >
      <SunClockCircle />
    </Provider>
  ))

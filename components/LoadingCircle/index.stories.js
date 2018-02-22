import { storiesOf } from '@storybook/react'
import { Provider } from 'react-redux'

import LoadingCircle from './'
import createStore from '../../data/createStore'

storiesOf('LoadingCircle', module).add('renders correctly', () => (
  <Provider store={createStore({})}>
    <LoadingCircle />
  </Provider>
))

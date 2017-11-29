import CurrentStatusText from './CurrentStatusText'
import moment from 'moment'

describe('CurrentStatusText', () => {
  test('contains the word daytime when it is day', () => {
    const state = {
      sunrise: moment().hours(10),
      sunset: moment().hours(18),
      currentTime: moment().hours(15)
    }

    const wrapper = mount(<CurrentStatusText {...state} />)
    expect(wrapper.text()).toContain('daytime')
  })

  test('contains the word nighttime when it is night', () => {
    const state = {
      sunrise: moment().hours(10),
      sunset: moment().hours(18),
      currentTime: moment().hours(19)
    }

    const wrapper = mount(<CurrentStatusText {...state} />)
    expect(wrapper.text()).toContain('nighttime')
  })
})

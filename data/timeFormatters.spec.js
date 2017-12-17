import { formatToHours, formatToHoursMinutes } from './timeFormatters'
import { LocalTime } from 'js-joda'

describe('formatToHoursMinutes', () => {
  test('shows am for hour 0', () => {
    expect(formatToHoursMinutes(LocalTime.of(11))).toContain('am')
  })

  test('shows am for hour 11', () => {
    expect(formatToHoursMinutes(LocalTime.of(0))).toContain('am')
  })

  test('shows pm for hour 12', () => {
    expect(formatToHoursMinutes(LocalTime.of(12))).toContain('pm')
  })

  test('shows pm for hour 23', () => {
    expect(formatToHoursMinutes(LocalTime.of(23))).toContain('pm')
  })

  test('shows 12 hours for midnight hour', () => {
    expect(formatToHoursMinutes(LocalTime.of(0, 15))).toContain('12:')
  })

  test('shows 12 hours for noon', () => {
    expect(formatToHoursMinutes(LocalTime.of(12, 15))).toContain('12:')
  })

  test('shows hours, minutes, and not seconds', () => {
    expect(formatToHoursMinutes(LocalTime.of(11, 15, 45))).toContain('11:15 ')
  })

  test('shows 1 hour for 1 pm', () => {
    expect(formatToHoursMinutes(LocalTime.of(13))).toContain('1:')
  })

  test('pads minutes with 0', () => {
    expect(formatToHoursMinutes(LocalTime.of(1, 1))).toContain(':01')
  })
})

describe('formatToHours', () => {
  test('shows 12 am for hour 0', () => {
    expect(formatToHours(LocalTime.of(0))).toContain('12 am')
  })

  test('shows 1 am for hour 1', () => {
    expect(formatToHours(LocalTime.of(1))).toContain('1 am')
  })

  test('shows 12 pm for hour 12', () => {
    expect(formatToHours(LocalTime.of(12))).toContain('12 pm')
  })

  test('shows 11 pm for hour 23', () => {
    expect(formatToHours(LocalTime.of(23))).toContain('11 pm')
  })
})

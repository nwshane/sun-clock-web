import formatTime from './formatTime'
import { LocalTime } from 'js-joda'

describe('formatTime', () => {
  test('shows am for hour 0', () => {
    expect(formatTime(LocalTime.of(11))).toContain('am')
  })

  test('shows am for hour 11', () => {
    expect(formatTime(LocalTime.of(0))).toContain('am')
  })

  test('shows pm for hour 12', () => {
    expect(formatTime(LocalTime.of(12))).toContain('pm')
  })

  test('shows pm for hour 23', () => {
    expect(formatTime(LocalTime.of(23))).toContain('pm')
  })

  test('shows 12 hours for midnight hour', () => {
    expect(formatTime(LocalTime.of(0, 15))).toContain('12:')
  })

  test('shows 12 hours for noon', () => {
    expect(formatTime(LocalTime.of(12, 15))).toContain('12:')
  })

  test('shows hours, minutes, and not seconds', () => {
    expect(formatTime(LocalTime.of(11, 15, 45))).toContain('11:15 ')
  })

  test('shows 1 hour for 1 pm', () => {
    expect(formatTime(LocalTime.of(13))).toContain('1:')
  })

  test('pads minutes with 0', () => {
    expect(formatTime(LocalTime.of(1, 1))).toContain(':01')
  })
})

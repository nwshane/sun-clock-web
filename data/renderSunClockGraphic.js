import { select } from 'd3-selection'
import { arc } from 'd3-shape'
import 'd3-selection-multi'
import getClockPieData from './getClockPieData'

const getSvgDimension = () => Math.min(window.innerWidth, window.innerHeight)

const getClockXPosition = svg => svg.attr('width') / 2
const getClockYPosition = svg => svg.attr('height') / 2

const getClockRadius = svg =>
  Math.min(svg.attr('width'), svg.attr('height')) / 2.1

const createSvg = containerSelector =>
  select(containerSelector)
    .append('svg')
    .attrs({
      width: getSvgDimension(),
      height: getSvgDimension()
    })

const createClockContainer = svg =>
  svg
    .append('g')
    .attr(
      'transform',
      'translate(' + getClockXPosition(svg) + ',' + getClockYPosition(svg) + ')'
    )

const keyFunction = d => d.data.key
const createClockSections = (clockContainer, state) =>
  clockContainer
    .selectAll('.clock-section')
    .data(getClockPieData(state), keyFunction)
    .enter()
    .append('g')
    .attr('class', 'clock-section')

const createArcShape = clockRadius =>
  arc()
    .outerRadius(clockRadius)
    .innerRadius(clockRadius * (3 / 4) - 20)
    .padAngle(0.02)

const createClockSectionPaths = (clockSections, arcShape) =>
  clockSections.append('path').attr('fill', function(d) {
    return d.data.color
  })

const updateClockSectionPaths = ({ clockContainer, arcShape }, state) =>
  clockContainer
    .selectAll('.clock-section')
    .data(getClockPieData(state), keyFunction)
    .select('path')
    .attr('d', arcShape)

const getCenteredTextSize = svg => (svg.attr('width') < 550 ? '30px' : '60px')

const createCenteredText = svg =>
  svg
    .append('text')
    .style('text-anchor', 'middle')
    .attr('x', svg.attr('width') / 2)
    .attr('y', svg.attr('height') / 2)
    .attr('font-size', getCenteredTextSize(svg))

const getFormattedCurrentTime = state => state.currentTime.format('h:mm:ss a')

const updateCenteredTextTime = ({ centeredText }, state) =>
  centeredText.text(getFormattedCurrentTime(state))

const createSunClock = (containerSelector, initialState) => {
  const svg = createSvg(containerSelector)
  const clockContainer = createClockContainer(svg)
  const clockSections = createClockSections(clockContainer, initialState)
  const arcShape = createArcShape(getClockRadius(svg))
  createClockSectionPaths(clockSections, arcShape)

  const centeredText = createCenteredText(svg)

  return {
    svg,
    clockContainer,
    clockSections,
    arcShape,
    centeredText
  }
}

const updateSunClock = (sunClock, state) => {
  updateClockSectionPaths(sunClock, state)
  updateCenteredTextTime(sunClock, state)
}

export default (containerSelector, initialState) => {
  const sunClock = createSunClock(containerSelector, initialState)
  updateSunClock(sunClock, initialState)

  return {
    update(newState) {
      updateSunClock(sunClock, newState)
    }
  }
}

import jsdom from 'jsdom'
import * as d3 from 'd3'

import Rect from './Rect'

const init = () => {
  const { JSDOM } = jsdom
  const jsDom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)
  const body = d3.select(jsDom.window.document).select('body')
  const svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('width', 1500).attr('height', 500)
  const marker = svg.append('marker')
    .attr('id', 'arrowhead')
    .attr('viewBox', '0 0 10 10')
    .attr('refX', 9)
    .attr('refY', 5)
    .attr('markerUnits', 'strokeWidth')
    .attr('markerWidth', 8)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')

  marker.append('path')
    .attr('d', 'M 0 0 L 10 5 L 0 10 z')
    .style('stroke-width', 1)
    .style('stroke-dasharray', '1,0')
  return { body, svg }
}

// https://stackoverflow.com/a/7273346/862862
const drawCircle = (g, cx, cy, r) => {
  const clipPath = g.append('defs').append('clipPath').attr('id', `circle-${cx}-${cy}`)
  clipPath.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r)
  g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', 2).attr('clip-path', `url(#circle-${cx}-${cy})`)
}

const drawEllipse = (g, cx, cy, rx, ry) => {
  const clipPath = g.append('defs').append('clipPath').attr('id', `ellipse-${cx}-${cy}`)
  clipPath.append('ellipse').attr('cx', cx).attr('cy', cy).attr('rx', rx).attr('ry', ry)
  g.append('ellipse').attr('cx', cx).attr('cy', cy).attr('rx', rx).attr('ry', ry).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', 2).attr('clip-path', `url(#ellipse-${cx}-${cy})`)
}

const drawNode = (g, node) => {
  const x = node.x - node.width / 2.0
  const y = node.y - node.height / 2.0
  const w = node.width
  const h = node.height
  const svg = g.append('svg').attr('x', x).attr('y', y).attr('width', w).attr('height', h)
  if (node.shape === 'rect' || node.shape === undefined) {
    new Rect(0, 0, w, h).draw(svg)
  } else if (node.shape === 'circle') {
    const r = Math.min(node.width, node.height) / 2.0
    drawCircle(svg, node.width / 2.0, node.height / 2.0, r)
  } else if (node.shape === 'ellipse') {
    drawEllipse(svg, node.width / 2.0, node.height / 2.0, node.width / 2.0, node.height / 2.0)
  }

  const text = svg.append('text').attr('x', '50%').attr('y', '50%').attr('fill', 'black').attr('text-anchor', 'middle').attr('dominant-baseline', 'central')
  text.append('tspan').attr('x', '50%').attr('y', '50%').attr('alignment-baseline', 'central').text(node.label)
}

const drawEdge = (g, points) => {
  for (let i = 0; i < points.length - 1; i++) {
    const point1 = points[i]
    const point2 = points[i + 1]
    const line = g.append('line').attr('x1', point1.x).attr('y1', point1.y)
      .attr('x2', point2.x).attr('y2', point2.y).attr('stroke', 'black')
    if (i === points.length - 2) {
      line.attr('marker-end', 'url(#arrowhead)')
    }
  }
}

const intersect = (node, point) => {
  switch (node.shape) {
    case 'circle':
      return intersectCircle(node, point)
    case 'ellipse':
      return intersectEllipse(node, node.width / 2.0, node.height / 2.0, point)
    default:
      return Rect.intersect(node, point)
  }
}

const intersectCircle = (node, point) => {
  const r = Math.min(node.width, node.height) / 2.0
  return intersectEllipse(node, r, r, point)
}

const intersectEllipse = (node, rx, ry, point) => {
  // Formulae from: http://mathworld.wolfram.com/Ellipse-LineIntersection.html

  const cx = node.x
  const cy = node.y

  const px = cx - point.x
  const py = cy - point.y

  const det = Math.sqrt(rx * rx * py * py + ry * ry * px * px)

  let dx = Math.abs(rx * ry * px / det)
  if (point.x < cx) {
    dx = -dx
  }
  let dy = Math.abs(rx * ry * py / det)
  if (point.y < cy) {
    dy = -dy
  }

  return {x: cx + dx, y: cy + dy}
}

module.exports = {
  init,
  drawNode,
  drawEdge,
  intersect
}

import jsdom from 'jsdom'
import * as d3 from 'd3'

import Rect from './Rect'
import Ellipse from './Ellipse'
import Circle from './Circle'
import Node from './Node'

export const init = () => {
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

export const drawNode = (g, node) => {
  new Node(node.x, node.y, node.width, node.height, node.shape, node.label).draw(g)
}

export const drawEdge = (g, points) => {
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

export const intersect = (node, point) => {
  switch (node.shape) {
    case 'circle':
      return Circle.intersect(node, Math.min(node.width, node.height) / 2, point)
    case 'ellipse':
      return Ellipse.intersect(node, node.width / 2, node.height / 2, point)
    default:
      return Rect.intersect(node, point)
  }
}

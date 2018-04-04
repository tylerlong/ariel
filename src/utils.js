const jsdom = require('jsdom')
const d3 = require('d3')

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

const drawRect = (g, x, y, w, h) => {
  g.append('rect').attr('x', x).attr('y', y).attr('width', w).attr('height', h).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', 2)
}

const drawCircle = (g, cx, cy, r) => {
  g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', 2)
}

const drawEllipse = (g, cx, cy, rx, ry) => {
  g.append('ellipse').attr('cx', cx).attr('cy', cy).attr('rx', rx).attr('ry', ry).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', 2)
}

const drawNode = (g, node) => {
  const x = node.x - node.width / 2.0
  const y = node.y - node.height / 2.0
  const w = node.width
  const h = node.height
  const svg = g.append('svg').attr('x', x).attr('y', y).attr('width', w).attr('height', h)
  if (node.shape === 'rect' || node.shape === undefined) {
    drawRect(svg, 0, 0, w, h)
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
      return intersectRect(node, point)
  }
}

const intersectCircle = (node, point) => {
  const r = Math.min(node.width, node.height) / 2.0
  return intersectEllipse(node, r, r, point)
}

const intersectEllipse = (node, rx, ry, point) => {
  // Formulae from: http://mathworld.wolfram.com/Ellipse-LineIntersection.html

  var cx = node.x
  var cy = node.y

  var px = cx - point.x
  var py = cy - point.y

  var det = Math.sqrt(rx * rx * py * py + ry * ry * px * px)

  var dx = Math.abs(rx * ry * px / det)
  if (point.x < cx) {
    dx = -dx
  }
  var dy = Math.abs(rx * ry * py / det)
  if (point.y < cy) {
    dy = -dy
  }

  return {x: cx + dx, y: cy + dy}
}

const intersectRect = (node, point) => {
  var x = node.x
  var y = node.y

  // Rectangle intersection algorithm from:
  // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
  var dx = point.x - x
  var dy = point.y - y
  var w = node.width / 2
  var h = node.height / 2

  var sx, sy
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    // Intersection is top or bottom of rect.
    if (dy < 0) {
      h = -h
    }
    sx = dy === 0 ? 0 : h * dx / dy
    sy = h
  } else {
    // Intersection is left or right of rect.
    if (dx < 0) {
      w = -w
    }
    sx = w
    sy = dx === 0 ? 0 : w * dy / dx
  }

  return {x: x + sx, y: y + sy}
}

module.exports = {
  init,
  drawNode,
  drawEdge,
  intersect
}

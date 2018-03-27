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

const drawTextRect = (g, text, x, y, w, h) => {
  const svg = g.append('svg').attr('x', x).attr('y', y).attr('width', w).attr('height', h)
  drawRect(svg, 0, 0, w, h)
  const textElement = svg.append('text').attr('x', '50%').attr('y', '50%').attr('fill', 'black').attr('text-anchor', 'middle')
  textElement.append('tspan').attr('x', '50%').attr('y', '50%').attr('alignment-baseline', 'central').text(text)
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

module.exports = {
  init,
  drawTextRect,
  drawEdge
}

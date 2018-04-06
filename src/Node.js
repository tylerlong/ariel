import * as R from 'ramda'

import Rect from './Rect'
import Ellipse from './Ellipse'
import Circle from './Circle'
import { lineHeight } from './constants'

class Node {
  constructor (x, y, w, h, shape, label) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.shape = shape
    this.label = label
  }

  drawLabel (svg) {
    const text = svg.append('text').attr('x', '50%').attr('y', '50%').attr('fill', 'black').attr('text-anchor', 'middle').attr('dominant-baseline', 'central')
    const lines = R.pipe(
      R.split('\n'),
      R.map(R.trim)
    )(this.label)
    if (lines.length % 2 === 0) { // even lines, for example: 4
      let emptyLineHeight = -lineHeight / 2
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '50%').attr('dy', -lineHeight - emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.reverse(R.range(0, Math.floor(lines.length / 2))))
      text.append('tspan').attr('x', '50%').attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      emptyLineHeight = -lineHeight / 2
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '50%').attr('dy', lineHeight + emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.range(Math.floor(lines.length / 2), lines.length))
    } else { // odd lines, for example: 5
      let emptyLineHeight = 0
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '50%').attr('dy', -lineHeight - emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.reverse(R.range(0, Math.floor(lines.length / 2))))
      if (R.isEmpty(lines[Math.floor(lines.length / 2)])) {
        text.append('tspan').attr('x', '50%').attr('y', '50%').attr('alignment-baseline', 'central').attr('visibility', 'hidden').text('.')
      } else {
        text.append('tspan').attr('x', '50%').attr('y', '50%').attr('alignment-baseline', 'central').text(lines[Math.floor(lines.length / 2)])
      }
      emptyLineHeight = 0
      R.forEach(i => {
        if (R.isEmpty(lines[i])) {
          emptyLineHeight += lineHeight
        } else {
          text.append('tspan').attr('x', '50%').attr('dy', lineHeight + emptyLineHeight).attr('alignment-baseline', 'central').text(lines[i])
          emptyLineHeight = 0
        }
      }, R.range(Math.floor(lines.length / 2) + 1, lines.length))
    }
  }

  draw (g) {
    const x = this.x - this.w / 2
    const y = this.y - this.h / 2
    const w = this.w
    const h = this.h
    const svg = g.append('svg').attr('x', x).attr('y', y).attr('width', w).attr('height', h)
    if (this.shape === 'rect' || this.shape === undefined) {
      new Rect(0, 0, w, h).draw(svg)
    } else if (this.shape === 'circle') {
      const r = Math.min(this.w, this.h) / 2
      new Circle(this.w / 2, this.h / 2, r).draw(svg)
    } else if (this.shape === 'ellipse') {
      new Ellipse(this.w / 2, this.h / 2, this.w / 2, this.h / 2).draw(svg)
    }
    this.drawLabel(svg)
  }
}

export default Node

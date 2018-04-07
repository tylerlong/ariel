import Rect from './Rect'
import Ellipse from './Ellipse'
import Circle from './Circle'
import Label from './Label'

class Node {
  constructor (x, y, w, h, shape, label) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.shape = shape
    this.label = label
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
    new Label(this.label, 4).draw(svg)
  }
}

export default Node

import Ellipse from './Ellipse'

class Circle extends Ellipse {
  constructor (cx, cy, r) {
    super(cx, cy, r, r)
  }

  static intersect (node, r, point) {
    return super.intersect(node, r, r, point)
  }
}

export default Circle

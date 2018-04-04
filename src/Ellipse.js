import uuid from 'uuid/v1'

class Ellipse {
  constructor (cx, cy, rx, ry) {
    this.cx = cx
    this.cy = cy
    this.rx = rx
    this.ry = ry
  }

  draw (g) {
    const id = uuid()
    const clipPath = g.append('defs').append('clipPath').attr('id', `ellipse-${id}`)
    clipPath.append('ellipse').attr('cx', this.cx).attr('cy', this.cy).attr('rx', this.rx).attr('ry', this.ry)
    g.append('ellipse').attr('cx', this.cx).attr('cy', this.cy).attr('rx', this.rx).attr('ry', this.ry).attr('fill', 'white').attr('stroke', 'black').attr('stroke-width', 2).attr('clip-path', `url(#ellipse-${id})`)
  }

  static intersect (node, rx, ry, point) {
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
}

export default Ellipse

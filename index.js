import dagre from 'dagre-layout'
import graphlib from 'graphlibrary'
import fs from 'fs'

import { init, drawNode, drawEdge, intersect } from './src/utils'
import { rectWidth, rectHeight, padding } from './src/constants'

// Create a new directed graph
const graph = new graphlib.Graph({ compound: true })

// Set an object for the graph label
graph.setGraph({
  rankdir: 'TB'
})

// Default to assigning a new object as a label for each new edge.
graph.setDefaultEdgeLabel(function () { return {} })

// A-->B
// A-->C
// A-->Z
// A-->Y
// B-->Y
// Z-->Y
// Y-->A

// Add nodes to the graph. The first argument is the node id. The second is
// metadata about the node. In this case we're going to add labels to each of
// our nodes.
graph.setNode('A', { label: 'A1\nA2\nA3\nA4', width: rectWidth, height: rectHeight, shape: 'circle' })
graph.setNode('B', { label: 'B1\n\nB3\nB4', width: rectWidth, height: rectHeight })
// graph.setNode('B', { label: 'B1\nB2\nB3\nB4', width: rectWidth, height: rectHeight })
graph.setNode('C', { label: 'C1\nC2\n\nC4', width: rectWidth, height: rectHeight, shape: 'circle' })
graph.setNode('Z', { label: 'Z1\n\n\n\nZ5', width: rectWidth, height: rectHeight })
// graph.setNode('Z', { label: 'Z1\nZ2\nZ3\nZ4\nZ5', width: rectWidth, height: rectHeight })
graph.setNode('Y', { label: 'Y1\nY2\nY3\nY4\nY5', width: rectWidth, height: rectHeight, shape: 'ellipse' })
// graph.setNode('kbacon', { label: 'Kevin Bacon', width: rectWidth, height: rectHeight })
graph.setNode('group', { label: 'Group' })

// Add edges to the graph.
graph.setEdge('A', 'B')
graph.setEdge('A', 'C')
graph.setEdge('A', 'Z')
graph.setEdge('A', 'Y')
graph.setEdge('B', 'Y')
graph.setEdge('Z', 'Y')
graph.setEdge('Y', 'A')

graph.setParent('A', 'group')
graph.setParent('B', 'group')
graph.setParent('C', 'group')
graph.setParent('Y', 'group')

dagre.layout(graph)

const { body, svg } = init()

const g = svg.append('g')

let minX = 1000
let minY = 1000
let maxX = -1000
let maxY = -1000

const nodes = graph.nodes().map(n => graph.node(n))
nodes.sort((a, b) => b.width * b.height - a.width * a.height)
nodes.forEach(node => {
  minX = Math.min(minX, node.x - node.width / 2)
  minY = Math.min(minY, node.y - node.height / 2)
  maxX = Math.max(maxX, node.x + node.width / 2)
  maxY = Math.max(maxY, node.y + node.height / 2)
  drawNode(g, node)
})

graph.edges().forEach(e => {
  const edge = graph.edge(e)

  // intersect
  const points = edge.points.slice(1, edge.points.length - 1)
  points.unshift(intersect(graph.node(e.v), points[0]))
  points.push(intersect(graph.node(e.w), points[points.length - 1]))

  for (let i = 0; i < points.length; i++) {
    const point = points[i]
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  }
  drawEdge(g, points)
})

svg.attr('width', maxX - minX + padding * 2).attr('height', maxY - minY + padding * 2)
g.attr('transform', `translate(${padding - minX}, ${padding - minY})`)

fs.writeFileSync('test.svg', body.html())

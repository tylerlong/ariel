const dagre = require('dagre-layout').default
const graphlib = require('graphlibrary')
const fs = require('fs')

const { rectSize, createBody, drawTextRect, drawEdge } = require('./src/utils')

// Create a new directed graph
const graph = new graphlib.Graph()

// Set an object for the graph label
graph.setGraph({})

// Default to assigning a new object as a label for each new edge.
graph.setDefaultEdgeLabel(function () { return {} })

// Add nodes to the graph. The first argument is the node id. The second is
// metadata about the node. In this case we're going to add labels to each of
// our nodes.
graph.setNode('kspacey', { label: 'Kevin Spacey', ...rectSize('Kevin Spacey') })
graph.setNode('swilliams', { label: 'Saul Williams', ...rectSize('Saul Williams') })
graph.setNode('bpitt', { label: 'Brad Pitt', ...rectSize('Brad Pitt') })
graph.setNode('hford', { label: 'Harrison Ford', ...rectSize('Harrison Ford') })
graph.setNode('lwilson', { label: 'Luke Wilson', ...rectSize('Luke Wilson') })
graph.setNode('kbacon', { label: 'Kevin Bacon', ...rectSize('Kevin Bacon') })

// Add edges to the graph.
graph.setEdge('kspacey', 'swilliams')
graph.setEdge('swilliams', 'kbacon')
graph.setEdge('bpitt', 'kbacon')
graph.setEdge('hford', 'lwilson')
graph.setEdge('lwilson', 'kbacon')

dagre.layout(graph)

const body = createBody()
const svg = body.append('svg').attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', 1500).attr('height', 500)
svg.append('defs').append('marker')
  .attr('id', 'arrowhead')
  .attr('viewBox', '-0 -5 10 10')
  .attr('refX', 13)
  .attr('refY', 0)
  .attr('orient', 'auto')
  .attr('markerWidth', 13)
  .attr('markerHeight', 13)
  .attr('xoverflow', 'visible')
  .append('svg:path')
  .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
  .attr('fill', '#999')
  .style('stroke', 'none')

const g = svg.append('g')

graph.nodes().forEach(n => {
  const node = graph.node(n)
  drawTextRect(g, node.label, node.x - node.width / 2.0, node.y - node.height / 2.0)
})

graph.edges().forEach(e => {
  const edge = graph.edge(e)
  drawEdge(g, edge.points)
})

fs.writeFileSync('test.svg', body.html())

class Graph {
    constructor() {
        this.nodes = [];
    }

    addNode(node) {
        this.nodes.push(node);
    }
    getNodes() {
        return this.nodes;
    }
}


class Node {
    constructor(heuristicCost, name, x, y) {
        this.neighbours = [];
        this.h = heuristicCost;
        this.name = name;
        this.pathCost = Infinity;
        this.parent = null; // pointer to the best parent node

        this.x = x;
        this.y = y;
    }

    addNeighbour(node, cost) {
        this.neighbours.push(new Edge(this, node, cost));
    }

    getNeighbours() {
        return this.neighbours;
    }

    setPathCost(cost) {
        this.pathCost = cost;
    }
}

class Edge {
    constructor(fromNode, toNode, edgeCost) {
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.edgeCost = edgeCost;
    }

    getPathCost() {
        return this.pathCost;
    }
}

/* let graph = new Graph();

let nodeA = new Node(0, "NodeA");
let nodeB = new Node(0, "NodeB");
let nodeC = new Node(0, "NodeC");
let nodeD = new Node(0, "NodeD");
let nodeE = new Node(0, "NodeE");
let nodeF = new Node(0, "NodeF");


nodeA.addNeighbour(nodeB, 1);
nodeA.addNeighbour(nodeC, 1);
graph.addNode(nodeA);

nodeB.addNeighbour(nodeD, 3);
graph.addNode(nodeB);

nodeD.addNeighbour(nodeF, 1);
graph.addNode(nodeD);

nodeC.addNeighbour(nodeD, 1);
nodeC.addNeighbour(nodeE, 1);
graph.addNode(nodeC);


nodeE.addNeighbour(nodeF, 2);
graph.addNode(nodeE);
graph.addNode(nodeF);

console.log(graph)
 */







const canv = document.getElementById('canvas');
const ctx = canv.getContext('2d');

let width = canv.width;
let height = canv.height;
let squareSize = width / 10;

let grid = [];

for (let y = 0; y < height+10; y += 10){
    for (let x = 0; x < width+10; x += 10){
          grid.push(x, y);
          ctx.strokeRect(x, y, x+10, y+10);
    }
}

let graph = new Graph(); 

for (let i = 0; i < grid.length; i++){
    let row = [];
    for (let k = 0; k < grid[i].length; k++){
        let node = new Node(0, i.toString + ", " + k.toString, k, i);
        row.push(node)
    }
    graph.addNode(row)
}


let nodes = graph.getNodes();
console.log(nodes[0].length)

for (let i = 0; i < nodes.length-1; i++){
    for (let k = 0; k < nodes[i].length-1; k++){
        console.log("hei")
        let node = nodes[i][k];
        console.log(node)
        node.addNeighbour(nodes[i+1][k+1], 1);
    }
}




ctx.fillRect(0,0,10,10);

ctx.fillRect(490, 390, 500, 400)

console.log(graph.getNodes())

aStar(graph, graph.getNodes()[0][0], graph.getNodes()[nodes.length][nodes[0].length-1]);


console.log(aStar(graph, nodeA, nodeF));
console.log(graph)



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
        if (node.neighbours.length > 0){
            let nodeContainsNeigbour = false;
            for (let edge of node.neighbours){
                if (edge.toNode == this){
                    nodeContainsNeigbour = true; 
                }
            }
            if (!nodeContainsNeigbour){
                node.neighbours.push(new Edge(node, this, cost));
            }
        } 
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
    // TODO - change to undirected graph vaiable names
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
let squareSize = 20;

let grid = [];

for (let y = 0; y < height+squareSize; y += squareSize){
    let row = []
    for (let x = 0; x < width+squareSize; x += squareSize){
          row.push([x, y]);
          ctx.strokeRect(x, y, x+squareSize, y+squareSize);
    }
    grid.push(row);
}

console.log(grid)


let graph = new Graph(); 


let goal = [width, height];
for (let i = 0; i < grid.length; i++){
    var row = [];
    for (let k = 0; k < grid[i].length; k++){
        let h = Math.abs(goal[0]-(k*squareSize)) + Math.abs(goal[1]-i*squareSize);
        let node = new Node(h, k.toString() + ", " + i.toString(), k, i);
        row.push(node)
    }
    graph.addNode(row)
}


let nodes = graph.getNodes();



for (let i = 0; i < nodes.length-1; i++){
    for (let k = 0; k < nodes[i].length-1; k++){
        let node = nodes[i][k];
        
        node.addNeighbour(nodes[i][k+1], 1);
        node.addNeighbour(nodes[i+1][k], 1);
        node.addNeighbour(nodes[i+1][k+1], 1);
        
        
        
    }
}




ctx.fillRect(0,0,squareSize,squareSize);

ctx.fillRect(width-squareSize, height-squareSize, width, height)

console.log("Graph: ", graph.getNodes())


console.log(graph.getNodes()[0][0])

let s = aStar(graph, graph.getNodes()[0][0], graph.getNodes()[nodes.length-1][nodes[0].length-1]);
console.log(s);
drawPath(s);




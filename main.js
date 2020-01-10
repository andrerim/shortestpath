class Graph {
    constructor(){
        this.nodes = [];
    }

    addNode(node){
        this.nodes.push(node);
    }
}


class Node {
    constructor(heuristicCost){
        this.neighbours = [];
        this.h = heuristicCost
    }

    addNeighbour(edge) {
        this.neighbours.push(edge);
        if(this.)
    }
}

class Edge {
    constructor(fromNode, toNode, pathCost){
        this.toNode = toNode;
        this.fromNode = this;
        this.pathCost = pathCost;
    }
}

let graph = new Graph();

let nodeA = new Node(0);
let nodeB = new Node(0);
let nodeC = new Node(0);
let nodeD = new Node(0);
let nodeE = new Node(0);
let nodeF = new Node(0);


nodeA.addNeighbour(new Edge(this, nodeB, 1));
nodeA.addNeighbour(new Edge(this, nodeC, 1));
graph.addNode(nodeA);

nodeB.addNeighbour(new Edge(this, nodeD, 3));
graph.addNode(nodeB);

nodeD.addNeighbour(new Edge(this, nodeF, 1));
graph.addNode(nodeD);

nodeC.addNeighbour(new Edge(this, nodeD, 1));
nodeC.addNeighbour(new Edge(this, nodeE, 1));
graph.addNode(nodeC);


nodeE.addNeighbour(new Edge(this, nodeF, 2));
graph.addNode(nodeE);
graph.addNode(nodeF);

console.log(graph)



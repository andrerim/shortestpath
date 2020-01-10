class Graph {
    constructor(){
        this.nodes = [];
    }

    addNode(node){
        this.nodes.push(node);
    }
    getNodes(){
        return this.nodes;
    }
}


class Node {
    constructor(heuristicCost, name){
        this.neighbours = [];
        this.h = heuristicCost;
        this.name = name;
        this.pathCost = Infinity;
        this.parent = null; // pointer to the best parent node
    }

    addNeighbour(node, cost) {
        this.neighbours.push(new Edge(this, node, cost));
    }

    getNeighbours(){
        return this.neighbours;
    }

    setPathCost(cost){
        this.pathCost = cost; 
    }
}

class Edge {
    constructor(fromNode, toNode, edgeCost){
        this.fromNode = fromNode;
        this.toNode = toNode;
        this.edgeCost = edgeCost;
    }

    getPathCost(){
        return this.pathCost;
    }
}

let graph = new Graph();

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

const canv = document.getElementById('canvas');
const ctx = canv.getContext('2d');





function aStar(graph, startNode, goalNode){
    let closedNodes = [];
    let openNodes = [startNode];

    let currentNode = openNodes[0];
    currentNode.pathCost = currentNode.h;
    var i = 0;
    while(i < 100){
        if (openNodes.length === 0){
            return 0;
        }
        let node = openNodes.shift();
        closedNodes.push(node);
        if (node == goalNode){

            var shortestPath = [];
            let someNode = goalNode;
            
            while (true){
                console.log(someNode)
                shortestPath.push(someNode);
                someNode = someNode.parent;
                if ((someNode == startNode)){
                    console.log(someNode);
                    return shortestPath;
                }
            }
            return shortestPath; 
        }
        let edges = node.getNeighbours(); 
        for (let edge of edges){
            if (!openNodes.includes(edge.toNode) && !closedNodes.includes(edge.toNode)){
                edge.toNode.parent = node; 
                edge.toNode.setPathCost(node.pathCost + edge.edgeCost);
                openNodes.push(edge.toNode);
            } else if (node.pathCost + edge.edgeCost < edge.toNode.pathCost){
                edge.toNode.parent = node; 
                edge.toNode.setPathCost(node.pathCost + edge.edgeCost);
               /*  if (closedNodes.includes(edge.toNode)){

                } */
            }
        }

        i++;
    }




    /* for (let i = 0; i < graph.getNodes().length; i++){
        console.log(graph.getNodes()[i].name);   
        for (let neighbour of graph.getNodes()[i].getNeighbours()){
            console.log("Neeighbour: ", neighbour.toNode.name);
        }
    } */
}






console.log(aStar(graph, nodeA, nodeF));
console.log(graph)



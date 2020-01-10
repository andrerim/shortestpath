canv = document.getElementById('canvas');
ctx = canv.getContext('2d');


function drawPath(closedNodes){
    for (let node of closedNodes) {
        ctx.fillRect(node.x, node.y, node.x+squareSize, node.y+squareSize);
    }
}

function aStar(graph, startNode, goalNode) {
    let closedNodes = [];
    let openNodes = [startNode];

    let currentNode = openNodes[0];
    currentNode.pathCost = currentNode.h;
    
    while (true) {
        drawPath(closedNodes);
        if (openNodes.length === 0) {
            return 0;
        }
        let node = openNodes.shift();
        closedNodes.push(node);
        if (node == goalNode) {

            var shortestPath = [];
            let someNode = goalNode;

            do {
                shortestPath.push(someNode);
                someNode = someNode.parent;
            } while (!(someNode == startNode))

            return shortestPath.reverse();
        }
        let edges = node.getNeighbours();
        for (let edge of edges) {
            if (!openNodes.includes(edge.toNode) && !closedNodes.includes(edge.toNode)) {
                edge.toNode.parent = node;
                edge.toNode.setPathCost(node.pathCost + edge.edgeCost);
                openNodes.push(edge.toNode);
            } else if (node.pathCost + edge.edgeCost + edge.toNode.h < edge.toNode.pathCost) {
                edge.toNode.parent = node;
                edge.toNode.setPathCost(node.pathCost + edge.edgeCost);
                /*  if (closedNodes.includes(edge.toNode)){
 
                 } */
            }
        }

       
    }




    /* for (let i = 0; i < graph.getNodes().length; i++){
        console.log(graph.getNodes()[i].name);   
        for (let neighbour of graph.getNodes()[i].getNeighbours()){
            console.log("Neeighbour: ", neighbour.toNode.name);
        }
    } */
}
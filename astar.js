canv = document.getElementById('canvas');
ctx = canv.getContext('2d');


function clearCanv(){
    ctx.clearRect(0,0, width, height);

    for (let y = 0; y < height+squareSize; y += squareSize){
        for (let x = 0; x < width+squareSize; x += squareSize){
              
              ctx.strokeRect(x, y, x+squareSize, y+squareSize);
        }
    }
}


function drawPath(closedNodes) {
    for (let node of closedNodes) {
        ctx.fillRect(node.x * squareSize, node.y * squareSize, node.x + squareSize, node.y + squareSize);
    }
}

function drawParents(node){

    if (node.parent == null){
        return
    } else {
        ctx.fillRect(node.x * squareSize, node.y * squareSize, node.x + squareSize, node.y + squareSize);
        drawParents(node.parent);
    }
}

function aStar(graph, startNode, goalNode) {
    console.log("startnode:", startNode);
    console.log("goalnode", goalNode);
    let closedNodes = [];
    let openNodes = [startNode];

    startNode.pathCost = 0;

    function iteration() {

        

        if (openNodes.length === 0) {
            return 0;
        }
        let node = openNodes.shift();
        clearCanv();
        //drawPath(openNodes);
        drawParents(node);

        closedNodes.push(node);

        if (node == goalNode) {

            var shortestPath = [];
            let someNode = goalNode;

            do {
                shortestPath.push(someNode);
                someNode = someNode.parent;
            } while (!(someNode == startNode))
            shortestPath.push(startNode);
            return shortestPath.reverse();
        }

        let edges = node.getNeighbours();

        for (let edge of edges) {
            if (!openNodes.includes(edge.toNode) && !closedNodes.includes(edge.toNode)) {
                edge.toNode.parent = node;
                // console.log("pathcost: ", node.pathCost, "edgecost: ", edge.edgeCost);
                edge.toNode.setPathCost(node.pathCost + edge.edgeCost);
                openNodes.push(edge.toNode);
            } else if (node.pathCost + edge.edgeCost + edge.toNode.h < edge.toNode.pathCost) {
                edge.toNode.parent = node;
                edge.toNode.setPathCost(node.pathCost + edge.edgeCost);
                /*  if (closedNodes.includes(edge.toNode)){
 
                 } */
            }
        }
        
        setTimeout(() => iteration(),10); 


    }

    iteration(); 




    /* for (let i = 0; i < graph.getNodes().length; i++){
        console.log(graph.getNodes()[i].name);   
        for (let neighbour of graph.getNodes()[i].getNeighbours()){
            console.log("Neeighbour: ", neighbour.toNode.name);
        }
    } */
}
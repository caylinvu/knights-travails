// coordinate changes for possible moves
const possibleMoves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2]
];

class Node {
    constructor(startY, startX, distance) {
        this.startY = startY;
        this.startX = startX;
        this.distance = distance;
        this.parent = null;
    }

    getPositionString() {
        return `${this.startY}, ${this.startX}`;
    }
}

class Gameboard {
    // takes current node coordinates and returns an array of the possible coordinates to move to
    getMoves(startY, startX) {
        let moves = [];
        for (let move of possibleMoves) {
            let [changeY, changeX] = move;
            let moveY = startY + changeY;
            let moveX = startX + changeX;
            moves.push([moveY, moveX]);
        }
        return moves;
    }

    // takes an array of start coordinates and an array of end coordinates, and returns the path traversed to get from start to end
    knightMoves(start, end) {
        let startY = start[0];
        let startX = start[1];
        let endY = end[0];
        let endX = end[1];

        // return if invalid coordinates are entered
        if (startY < 0 || startX < 0 || startY > 7 || startX > 7 || endY < 0 || endX < 0 || endY > 7 || endX > 7) {
            console.log('Please enter valid start and end coordinates (0-7)');
            return;
        }

        let startNode = new Node(startY, startX, 0);

        let queue = [];
        queue.push(startNode);

        let visited = new Set();

        while (queue.length > 0) {
            // remove node from queue
            // in practice we should use a real queue class so that we can dequeue in 0(1) time instead of 0(n) time
            let node = queue.shift();

            // process node - if the current nodes coordinates match the end coordinates, print and return the path
            if (node.startY === endY && node.startX === endX) {
                let tmpNode = node;
                let path = [];

                while (tmpNode != null) {
                    path.unshift([tmpNode.startY, tmpNode.startX]);
                    tmpNode = tmpNode.parent;
                }

                if (node.distance === 0) {
                    console.log('No moves need to get to target!');
                } else if (node.distance === 1) {
                    console.log(`You made it in ${node.distance} move! Here's your path:`);
                } else {
                    console.log(`You made it in ${node.distance} moves! Here's your path:`);
                }

                for (let i = 0; i < path.length; i++) {
                    console.log(path[i]);
                }
                return path;
            }

            // add current node's position to the visited set
            visited.add(node.getPositionString());

            // add possible moves
            for (let move of this.getMoves(node.startY, node.startX)) {
                let [moveY, moveX] = move;
                let nextNode = new Node(moveY, moveX, node.distance + 1);
                nextNode.parent = node;

                // check for going out of bounds
                if (nextNode.startY < 0 || nextNode.startX < 0 || nextNode.startY > 7 || nextNode.startX > 7) {
                    continue;
                }

                // check for already visited
                if (visited.has(nextNode.getPositionString())) {
                    continue;
                }

                // push next possible moves to queue
                queue.push(nextNode);
            }
        }
    }
}


let gameboard = new Gameboard();
gameboard.knightMoves([3,3],[3,4]);
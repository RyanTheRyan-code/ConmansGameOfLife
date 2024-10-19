// Any variables with `Map` at the end, are maps.
// Any variables with `Coord` at the end, are [x,y] arrays.
// Any variables with `State` at the end, are numbers, representing the states of a cell.

// applyRules should be a function pointer such that:
// returns: number checkAtNewState
// params:  Map curStateMap, [number, number] checkAtCoord
let applyRules = function(curStateMap, checkAtCoord) {
    let rules = [lessThanTwoAlive, twoOrThreeAlive];
    let max = 0;
    for(let rule of rules) {
        let result = rule(curStateMap, checkAtCoord);
        // console.log(result);
        max = (max > result) ? max : result;
    }
    return max;
};

// number lessThanTwoAlive(Map, [number, number])
let lessThanTwoAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum < 2) ? 0 : curStateMap.get(checkAtCoord.toString());
    }
    return 0;
}

// number twoOrThreeAlive(Map, [number, number])
let twoOrThreeAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        // console.log(`two or three sum neighbors: ${sum}`);
        return (sum == 2 || sum == 3) ? curStateMap.get(checkAtCoord.toString()) : 0;
    }
    return 0;
}

// number moreThanThreeAlive(Map, [number, number])
let moreThanThreeAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum > 3) ? 0 : curStateMap.get(checkAtCoord.toString());
    }
    return 0;
}

// number exactThree(Map, [number, number])
let exactThree = function (curStateMap, checkAtCoord) {
    if (!curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum == 3) ? 1 : curStateMap.get(checkAtCoord.toString());
    }
    return curStateMap[checkAtCoord];
}

// number sumNeighbor(Map, [number, number], number)
function sumNeighbor(curStateMap, checkAtCoord, value) {
    let sum = (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]-1].toString()) && curStateMap.get([checkAtCoord[0]-1, checkAtCoord[1]-1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0], checkAtCoord[1]-1].toString()) && curStateMap.get([checkAtCoord[0], checkAtCoord[1]-1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]-1].toString()) && curStateMap.get([checkAtCoord[0]+1, checkAtCoord[1]-1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]].toString()) && curStateMap.get([checkAtCoord[0]-1, checkAtCoord[1]].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]].toString()) && curStateMap.get([checkAtCoord[0]+1, checkAtCoord[1]].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]+1].toString()) && curStateMap.get([checkAtCoord[0]-1, checkAtCoord[1]+1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0], checkAtCoord[1]+1].toString()) && curStateMap.get([checkAtCoord[0], checkAtCoord[1]+1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]+1].toString()) && curStateMap.get([checkAtCoord[0]+1, checkAtCoord[1]+1].toString()) == value);
    let above = curStateMap.has([checkAtCoord[0], checkAtCoord[1]-1].toString());
    console.log(`for coord: (${checkAtCoord[0]}, ${checkAtCoord[1]}), sum: ${sum}, above: ${above}`);
    return sum;
}

//Map step(Map)
function step(prevStateMap) {
    let nextStateMap = new Map();
    let nextEmptyMap = new Map();
    prevStateMap.forEach((cellState, coord) => {
        let stateChange = false;
        //we could've already looked at it from its alive neighbors
        if(!nextStateMap.has(coord) && !nextEmptyMap.has(coord)) {
            let newState = applyRules(prevStateMap, coord); 
            stateChange = prevStateMap[coord] == newState;
            updateCoord(coord, prevStateMap, nextStateMap, nextEmptyMap);
            // prevStateMap[coord] = newState;
        }
        //if the cell didn't change, we don't need to update the neighbors
        if(stateChange) {
            //look at neighbors
            let c = [coord[0]-1, coord[1]-1];
            updateCoord(c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0], coord[1]-1];
            updateCoord(c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]-1];
            updateCoord(c, prevStateMap, nextStateMap, nextEmptyMap);

            c = [coord[0]-1, coord[1]];
            updateCoord(c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]];
            updateCoord(c, prevStateMap, nextStateMap, nextEmptyMap);

            c = [coord[0]-1, coord[1]+1];
            updateCoord(c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0], coord[1]+1];
            updateCoord(c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]+1];
            updateCoord(c, prevStateMap, nextStateMap, nextEmptyMap);
        }
    });
    return nextStateMap;
}

// void updateCoord([number,number] coord, Map prevStateMap, Map nextStateMap, Map nextEmptyMap)
function updateCoord(coord, prevStateMap, nextStateMap, nextEmptyMap) {
    if(!nextStateMap.has(coord) && !nextEmptyMap.has(coord)) {
        let newState = applyRules(prevStateMap, coord);
        if(newState == 0) {
            nextEmptyMap.set(coord, newState);
        } else if(newState == -1) {
            nextStateMap.set(coord, prevStateMap.get(coord));
        } else {
            nextStateMap.set(coord, newState);
        }
    }
}

// let rule1 = function(curStateMap, checkAtCoord) { 
//     if(curStateMap[[checkAtCoord[0], checkAtCoord[1]+1]] == 1 || curStateMap[[checkAtCoord[0], checkAtCoord[1]-1]] == 1) {
//         return 2;
//     }
//     return 0;
// }
// let rule2 = function(curStateMap, checkAtCoord) {
//     if(curStateMap[[checkAtCoord[0]-1, checkAtCoord[1]]] == 1 || curStateMap[[checkAtCoord[0]+1, checkAtCoord[1]]] == 1) {
//         return 3;
//     }
//     return 0;
// }


// applyRules = function(curStateMap, checkAtCoord) {
//     let rules = [rule1, rule2];
//     let m = 0;
//     for(r in rules) {
//         m = max(m, r(curStateMap, checkAtCoord));
//     }
//     return m;    
// }
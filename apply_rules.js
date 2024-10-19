const NO_STATE_CHANGE = -1;
const DEAD_STATE = 0;
const PROTECTED = 0.4;



// Any variables with `Map` at the end, are maps.
// Any variables with `Coord` at the end, are [x,y] arrays.
// Any variables with `State` at the end, are numbers, representing the states of a cell.

// applyRules should be a function pointer such that:
// returns: number checkAtNewState
// params:  Map curStateMap, [number, number] checkAtCoord
let applyRules = function(curStateMap, checkAtCoord) {
    // let rules = [lessThanTwoAlive, twoOrThreeAlive, moreThanThreeAlive, exactThree];
    // let rules = [lessThanTwoAlive, twoOrThreeAlive, moreThanThreeAlive, exactThree, fourToState2, oneToState2, threeS2ToState3];
    let rules = [
        {type: 0, numCells: 2, comparison: 0, neighborState: 1},
        {type: 1, numCells: 2, comparison: 2, neighborState: 1},
        {type: 1, numCells: 3, comparison: 2, neighborState: 1},
        {type: 0, numCells: 3, comparison: 4, neighborState: 1},
        {type: 2, numCells: 3, comparison: 2, neighborState: 1, babyState: 1}
    ]
    let max = NO_STATE_CHANGE;
    for(let rule of rules) {
        // console.log(`${rule[0]}`)
        let result = max;
        switch (rule.type) {
            case 0:
                result = generalDead(rule.numCells, rule.comparison, rule.neighborState, curStateMap, checkAtCoord);
                // console.log(`gendead on coord: ${checkAtCoord} and result: ${result}`);
                break;
            case 1:
                result = generalStay(rule.numCells, rule.comparison, rule.neighborState, curStateMap, checkAtCoord);
                // console.log(`genstay and result: ${result}`);
                break;
            case 2:
                result = generalRepr(rule.numCells, rule.comparison, rule.neighborState, rule.babyState, curStateMap, checkAtCoord);
                // console.log(`genrepr and result: ${result}`);
                break;
        }

        // console.log(`checking rule at ${checkAtCoord}, gets result ${result}`);
        max = (max > result) ? max : result;
    }
    return max;
};

let generalDead = function(numCells, comparison, neighborState, curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, neighborState);
        switch (comparison) {
            case 0:
                return (sum < numCells) ? DEAD_STATE : NO_STATE_CHANGE;
            case 1:
                return (sum <= numCells) ? DEAD_STATE : NO_STATE_CHANGE;
                case 2:
                return (sum == numCells) ? DEAD_STATE : NO_STATE_CHANGE;
                case 3:
                return (sum >= numCells) ? DEAD_STATE : NO_STATE_CHANGE;
                case 4:
                return (sum > numCells) ? DEAD_STATE : NO_STATE_CHANGE;
            }
    }
    return DEAD_STATE;
}

let generalStay = function(numCells, comparison, neighborState, curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, neighborState);
        // console.log(sum);
        switch (comparison) {
            case 0:
                return (sum < numCells) ? PROTECTED : DEAD_STATE;
            case 1:
                return (sum <= numCells) ? PROTECTED : DEAD_STATE;
            case 2:
                return (sum == numCells) ? PROTECTED : DEAD_STATE;
            case 3:
                return (sum >= numCells) ? PROTECTED : DEAD_STATE;
            case 4:
                return (sum > numCells) ? PROTECTED : DEAD_STATE;
        }
    }
    return DEAD_STATE;
}

let generalRepr = function(numCells, comparison, neighborState, babyState, curStateMap, checkAtCoord) {
    if (!curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, neighborState);
        switch (comparison) {
            case 0:
                return (sum < numCells) ? babyState : DEAD_STATE;
            case 1:
                return (sum <= numCells) ? babyState : DEAD_STATE;
            case 2:
                return (sum == numCells) ? babyState : DEAD_STATE;
            case 3:
                return (sum >= numCells) ? babyState : DEAD_STATE;
            case 4:
                return (sum > numCells) ? babyState : DEAD_STATE;
        }
    }
    return NO_STATE_CHANGE;
}

// number lessThanTwoAlive(Map, [number, number])
let lessThanTwoAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum < 2) ? DEAD_STATE : NO_STATE_CHANGE;
    }
    return DEAD_STATE;
}

// number twoOrThreeAlive(Map, [number, number])
let twoOrThreeAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        // console.log(`two or three sum neighbors: ${sum}`);
        return (sum == 2 || sum == 3) ? NO_STATE_CHANGE : DEAD_STATE;
    }
    return DEAD_STATE;
}

// number moreThanThreeAlive(Map, [number, number])
let moreThanThreeAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum > 3) ? DEAD_STATE : NO_STATE_CHANGE;
    }
    return DEAD_STATE;
}

// number exactThree(Map, [number, number])
let exactThree = function (curStateMap, checkAtCoord) {
    if (!curStateMap.has(checkAtCoord.toString())) {
        // console.log(`come to life at ${checkAtCoord}?`);
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        // console.log(`sum ${sum}?`);
        return (sum == 3) ? 1 : DEAD_STATE;
    }
    return NO_STATE_CHANGE;
}

let fourToState2 = function (curStateMap, checkAtCoord) {
    if (!curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum == 4) ? 2 : DEAD_STATE;
    }
    return NO_STATE_CHANGE;
}

let oneToState2 = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum == 1) ? 2 : DEAD_STATE;
    }
    return DEAD_STATE;
}

let threeS2ToState3 = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 2);
        return (sum >= 3) ? 3 : DEAD_STATE;
    }
    return DEAD_STATE;
}



// number sumNeighbor(Map, [number, number], number)
function sumNeighbor(curStateMap, checkAtCoord, value) {
    let sum = 
    (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]-1].toString()) && curStateMap.get([checkAtCoord[0]-1, checkAtCoord[1]-1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0], checkAtCoord[1]-1].toString()) && curStateMap.get([checkAtCoord[0], checkAtCoord[1]-1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]-1].toString()) && curStateMap.get([checkAtCoord[0]+1, checkAtCoord[1]-1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]].toString()) && curStateMap.get([checkAtCoord[0]-1, checkAtCoord[1]].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]].toString()) && curStateMap.get([checkAtCoord[0]+1, checkAtCoord[1]].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]+1].toString()) && curStateMap.get([checkAtCoord[0]-1, checkAtCoord[1]+1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0], checkAtCoord[1]+1].toString()) && curStateMap.get([checkAtCoord[0], checkAtCoord[1]+1].toString()) == value) +
    (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]+1].toString()) && curStateMap.get([checkAtCoord[0]+1, checkAtCoord[1]+1].toString()) == value);
    // let above = curStateMap.has([checkAtCoord[0], checkAtCoord[1]-1].toString());
    // console.log(`for coord: (${checkAtCoord}), sum: ${sum}, above: ${[checkAtCoord[0], checkAtCoord[1]-1].toString()} ${above}`);
    return sum;
}

//Map step(Map)
function step(prevStateMap) {
    let nextStateMap = new Map();
    let nextEmptyMap = new Map();
    prevStateMap.forEach((cellState, coordStrOriginal) => {
        let coordOfStrs = coordStrOriginal.split(',');
        let coord = [parseInt(coordOfStrs[0],10), parseInt(coordOfStrs[1],10)];
        let stateChange = false;
        //we could've already looked at it from its alive neighbors
        let cstr = coord.toString();
        if(!nextStateMap.has(cstr) && !nextEmptyMap.has(cstr)) {
            let newState = applyRules(prevStateMap, coord);
            stateChange = prevStateMap.get(cstr) != newState;
            updateCoord(cstr, coord, prevStateMap, nextStateMap, nextEmptyMap);
        }
        //if the cell didn't change, we don't need to update the neighbors
        if(stateChange) {
            //look at neighbors
            let c = [coord[0]-1, coord[1]-1];
            let cstr = c.toString();
            if(!prevStateMap.has(cstr)) updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0], coord[1]-1];
            cstr = c.toString();
            if(!prevStateMap.has(cstr)) updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]-1];
            cstr = c.toString();
            if(!prevStateMap.has(cstr)) updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);

            c = [coord[0]-1, coord[1]];
            cstr = c.toString();
            if(!prevStateMap.has(cstr)) updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]];
            cstr = c.toString();
            if(!prevStateMap.has(cstr)) updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);

            c = [coord[0]-1, coord[1]+1];
            cstr = c.toString();
            if(!prevStateMap.has(cstr)) updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0], coord[1]+1];
            cstr = c.toString();
            if(!prevStateMap.has(cstr)) updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]+1];
            cstr = c.toString();
            if(!prevStateMap.has(cstr)) updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
        }
    });
    return nextStateMap;
}

// void updateCoord(string coordStr, [number,number] coord, Map prevStateMap, Map nextStateMap, Map nextEmptyMap)
function updateCoord(coordStr, coord, prevStateMap, nextStateMap, nextEmptyMap) {
    if(!nextStateMap.has(coordStr) && !nextEmptyMap.has(coordStr)) {
        let newState = applyRules(prevStateMap, coord);
        if(newState == DEAD_STATE) {
            nextEmptyMap.set(coordStr, DEAD_STATE);
        } else if(newState == NO_STATE_CHANGE || newState == PROTECTED) {
            // console.log(`no change for ${coordStr}`);
            if(prevStateMap.get(coordStr) == DEAD_STATE) {
                nextEmptyMap.set(coordStr, DEAD_STATE);
            } else {
                nextStateMap.set(coordStr, prevStateMap.get(coordStr));
            }
        } else {
            nextStateMap.set(coordStr, newState);
        }
    }
}

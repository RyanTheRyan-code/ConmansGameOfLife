const NO_STATE_CHANGE = 10000;
const NO_DECISION = -1;

// Any variables with `Map` at the end, are maps.
// Any variables with `Coord` at the end, are [x,y] arrays.
// Any variables with `State` at the end, are numbers, representing the states of a cell.

// applyRules should be a function pointer such that:
// returns: number checkAtNewState
// params:  Map curStateMap, [number, number] checkAtCoord
let applyRules = function(curStateMap, checkAtCoord) {
    let rules = [lessThanTwoAlive, twoOrThreeAlive, moreThanThreeAlive, exactThree];
    let max = 0;
    for(let rule of rules) {
        let result = rule(curStateMap, checkAtCoord);
        console.log(`checking rule at ${checkAtCoord}, gets result ${result}`);
        max = (max > result) ? max : result;
    }
    return max;
};

// number lessThanTwoAlive(Map, [number, number])
let lessThanTwoAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum < 2) ? 0 : NO_STATE_CHANGE;
    }
    return NO_DECISION;
}

// number twoOrThreeAlive(Map, [number, number])
let twoOrThreeAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        // console.log(`two or three sum neighbors: ${sum}`);
        return (sum == 2 || sum == 3) ? NO_STATE_CHANGE : 0;
    }
    return NO_DECISION;
}

// number moreThanThreeAlive(Map, [number, number])
let moreThanThreeAlive = function (curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum > 3) ? 0 : NO_DECISION;
    }
    return NO_DECISION;
}

// number exactThree(Map, [number, number])
let exactThree = function (curStateMap, checkAtCoord) {
    if (!curStateMap.has(checkAtCoord.toString())) {
        let sum = sumNeighbor(curStateMap, checkAtCoord, 1);
        return (sum == 3) ? 1 : 0;
    }
    return NO_DECISION;
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
            stateChange = prevStateMap[cstr] == newState;
            updateCoord(cstr, coord, prevStateMap, nextStateMap, nextEmptyMap);
            // prevStateMap[coord] = newState;
        }
        //if the cell didn't change, we don't need to update the neighbors
        if(stateChange) {
            //look at neighbors
            let c = [coord[0]-1, coord[1]-1];
            let cstr = c.toString();
            updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0], coord[1]-1];
            cstr = c.toString();
            updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]-1];
            cstr = c.toString();
            updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);

            c = [coord[0]-1, coord[1]];
            cstr = c.toString();
            updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]];
            cstr = c.toString();
            updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);

            c = [coord[0]-1, coord[1]+1];
            cstr = c.toString();
            updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0], coord[1]+1];
            cstr = c.toString();
            updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
            c = [coord[0]+1, coord[1]+1];
            cstr = c.toString();
            updateCoord(cstr, c, prevStateMap, nextStateMap, nextEmptyMap);
        }
    });
    return nextStateMap;
}

// void updateCoord(string coordStr, [number,number] coord, Map prevStateMap, Map nextStateMap, Map nextEmptyMap)
function updateCoord(coordStr, coord, prevStateMap, nextStateMap, nextEmptyMap) {
    if(!nextStateMap.has(coordStr) && !nextEmptyMap.has(coordStr)) {
        let newState = applyRules(prevStateMap, coord);
        if(newState == 0) {
            nextEmptyMap.set(coordStr, 0);
        } else if(newState == NO_STATE_CHANGE) {
            if(prevStateMap.get(coordStr) == 0) {
                nextEmptyMap.set(coordStr, 0);
            } else {
                nextStateMap.set(coordStr, prevStateMap.get(coordStr));
            }
        } else {
            nextStateMap.set(coordStr, newState);
        }
    }
}
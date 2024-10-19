// Any variables with `Map` at the end, are maps.
// Any variables with `Coord` at the end, are [x,y] arrays.
// Any variables with `State` at the end, are numbers, representing the states of a cell.

// applyRules should be a function pointer such that:
// returns: number checkAtNewState
// params:  Map curStateMap, [number, number] checkAtCoord
let applyRules = function(curStateMap, checkAtCoord) { return 1; };

function twoAliveNeighbors(curStateMap, checkAtCoord) {
    if (curStateMap.has(checkAtCoord)) {
        let sum = (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]-1]) && curStateMap([checkAtCoord[0]-1, checkAtCoord[1]-1]) == 1) +
        (curStateMap.has([checkAtCoord[0], checkAtCoord[1]-1]) && curStateMap([checkAtCoord[0], checkAtCoord[1]-1]) == 1) +
        (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]-1]) && curStateMap([checkAtCoord[0]+1, checkAtCoord[1]-1]) == 1) +
        (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]]) && curStateMap([checkAtCoord[0]-1, checkAtCoord[1]]) == 1) +
        (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]]) && curStateMap([checkAtCoord[0]+1, checkAtCoord[1]]) == 1) +
        (curStateMap.has([checkAtCoord[0]-1, checkAtCoord[1]+1]) && curStateMap([checkAtCoord[0]-1, checkAtCoord[1]+1]) == 1) +
        (curStateMap.has([checkAtCoord[0], checkAtCoord[1]+1]) && curStateMap([checkAtCoord[0], checkAtCoord[1]+1]) == 1) +
        (curStateMap.has([checkAtCoord[0]+1, checkAtCoord[1]+1]) && curStateMap([checkAtCoord[0]+1, checkAtCoord[1]+1]) == 1);
        
    }
    return false;
}

//Map step(Map)
function step(prevStateMap) {
    console.log("step");
    let nextStateMap = new Map();
    let nextEmptyMap = new Map();
    prevStateMap.forEach((cellState, coord) => {
        //we could've already looked at it from its alive neighbors
        if(!nextStateMap.has(coord) && !nextEmptyMap.has(coord)) {

        }
    });
}
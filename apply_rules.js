// Any variables with `Map` at the end, are maps.
// Any variables with `Coord` at the end, are [x,y] arrays.
// Any variables with `State` at the end, are numbers, representing the states of a cell.

// applyRules should be a function pointer such that:
// returns: number checkAtNewState
// params:  Map curStateMap, [number, number] checkAtCoord
let applyRules = function(curStateMap, checkAtCoord) { return 1; };

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
}

// void updateCoord([number,number] coord, Map prevStateMap, Map nextStateMap, Map nextEmptyMap)
function updateCoord(coord, prevStateMap, nextStateMap, nextEmptyMap) {
    if(!nextStateMap.has(coord) && !nextEmptyMap.has(coord)) {
        let newState = applyRules(prevStateMap, coord);
        if(newState == 0) {
            nextEmptyMap[coord] = newState;
        } else if(newState == -1) {
            nextStateMap[coord] = prevStateMap[coord];
        } else {
            nextStateMap[coord] = newState;
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
let boardExists = false;
let board_height;
let board_height_min;
let board_width;
let board_width_min;
let alive_cells = new Map(); // Map[x,y] = state
let stepInterval;
let activeStepInterval = false;
let speed = 500;
let genSpeed = 25;
let satisfyingMode = false;

generateBoard();

function moveBoard(amount) {
    subtractMap(alive_cells);
    board_width_min += amount;
    board_width += amount;
    addMap(alive_cells);

}

function generateBoard(width=16, height=16) {
    if(boardExists) {
        document.getElementById("board").remove();
        document.getElementById("rulesContainer").remove();
    }
    boardExists = true;

    board_height = height;
    board_height_min = 0;
    board_width = width;
    board_width_min = 0;
    alive_cells = new Map(); // Map[x,y] = state
    
    stopSteps();

    let gameDiv = document.getElementById("game");
    let board = document.createElement("div");
    board.id = "board";
    for(i = 0; i < width; i++) {
        let line = document.createElement("div");
        line.className = "line";
        for (let j = 0; j < height; j++) {
            let space = document.createElement("div");
            space.id = `${j},${i}`;
            space.onclick = function() { setStateWithElement(this, (Number(space.className.split("state-")[1]) + 1) % 5); };
            line.append(space);
            setTimeout(function () {
                space.className = "space pop-out state-0";
            }, i*genSpeed + j*genSpeed);
        }
        board.append(line);
    }
    let rulesPage = document.createElement("div");
    rulesPage.id = "rulesContainer";
    gameDiv.append(board);
    gameDiv.append(rulesPage);
    resetRules();
    console.log("finished generating board");
}

// function randRule() {
//     addRandRule();
// }

function getAlive() { return alive_cells; }

function randBoard() {
    let rand = Math.floor(Math.random() * (board_width*board_height));
    for(let i = 0; i < rand; i++) {
        setStateWithPos(Math.floor(Math.random() * board_width),Math.floor(Math.random() * board_height),Math.ceil(Math.random() * 4));
    }
    if(activeStepInterval) startSteps();
}

function setStateWithPos(x, y, state) {
    updateAliveCellsForSetState([x, y].toString(), state);
    
    space = getSpace(x, y);
    setAnimationsForSetState(space, state);
}
function setStateWithElement(space, state) {
    updateAliveCellsForSetState(space.id, state);
    setAnimationsForSetState(space, state);
}
function updateAliveCellsForSetState(coordStr, state) {
    if(state == DEAD_STATE) {
        alive_cells.delete(coordStr);
    } else {
        alive_cells.set(coordStr,state);
    }
}
function setStateVisually(x, y, state) {
    let space = getSpace(x,y);
    setAnimationsForSetState(space,state);
}
function setAnimationsForSetState(space, state) {
    space.classList.add("shrink");
    setTimeout(() => {
        space.className = `space pop-out state-${state}`;
    }, 150);
}

function getSpace(x, y) {
    return document.getElementById(`${x},${y}`);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// void subtractMap(Map)
function subtractMap(map) {
    map.forEach((value, coordStrOriginal) => {
        //coord[0] is x, coord[1] is y
        let coordOfStrs = coordStrOriginal.split(',');
        let coord = [parseInt(coordOfStrs[0],10), parseInt(coordOfStrs[1],10)];
        if(coord[0] >= board_width_min && coord[0] < board_width && coord[1] >= board_height_min && coord[1] < board_height) {
            setStateVisually(coord[0]+board_width_min,coord[1]+board_height_min, value);
        }
    });
}

// void addMap(Map)
function addMap(map) {
    map.forEach((value, coordStrOriginal) => {
        //coord[0] is x, coord[1] is y
        let coordOfStrs = coordStrOriginal.split(',');
        let coord = [parseInt(coordOfStrs[0],10), parseInt(coordOfStrs[1],10)];
        if(coord[0] >= board_width_min && coord[0] < board_width && coord[1] >= board_height_min && coord[1] < board_height && value != getSpace(coord[0], coord[1]).className.split("state-")[1]) {
            setStateVisually(coord[0]+board_width_min,coord[1]+board_height_min, value);
        }
    });
}

function doStep() {
    // console.log("Before:");
    // console.log(alive_cells);
    let new_alive_cells = step(alive_cells);
    let old_alive_cells = mapDifference(alive_cells, new_alive_cells);
    subtractMap(old_alive_cells);
    addMap(new_alive_cells);
    alive_cells = new_alive_cells;
    if(alive_cells.size === 0 && satisfyingMode) {
        stopSteps();
        setTimeout(() => { 
            randBoard();
            startSteps(); 
        }, speed);
    }
    // console.log("After:");
    // console.log(alive_cells);
    // console.log("____________");
}

function mapDifference(map1, map2) {
    const diff = new Map();
  
    // Check for keys in map1 that are not in map2
    for (const [key, value] of map1) {
        if (!map2.has(key) || map2.get(key) !== value) {
            diff.set(key, value);
        }
    }
  
    return diff;
}

function startSteps() {
    document.getElementById("goButton").style.display = "none";
    document.getElementById("stopButton").style.display = "flex";
    clearInterval(stepInterval);
    stepInterval = setInterval(() => { doStep() }, speed);
    activeStepInterval = true;
}
function stopSteps() {
    document.getElementById("stopButton").style.display = "none";
    document.getElementById("goButton").style.display = "flex";
    clearInterval(stepInterval);
    activeStepInterval = false;
}

function toggleTurbo() {
    if(speed === 500) {
        speed = 100;
        document.getElementById("turboButton").style.filter = "brightness(125%) hue-rotate(-45deg)";
        if(activeStepInterval) startSteps();
    }
    else if(speed === 100) {
        speed = 50;
        document.getElementById("turboButton").style.filter = "brightness(125%) hue-rotate(-120deg)";
        if(activeStepInterval) startSteps();
    }
    else if(speed === 50) {
        speed = 10;
        document.getElementById("turboButton").style.filter = "brightness(125%) hue-rotate(-180deg)";
        if(activeStepInterval) startSteps();
    }
    else {
        speed = 500;
        document.getElementById("turboButton").style.filter = "brightness(100%) hue-rotate(0)";
        if(activeStepInterval) startSteps();
    }
}
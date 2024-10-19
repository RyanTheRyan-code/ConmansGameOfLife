let boardExists = false;
let board_height;
let board_width;
let alive_cells = new Map(); // Map[x,y] = state

function generateBoard(width=16, height=16) {
    if(boardExists) document.getElementById("board").remove();
    boardExists = true;

    let gameDiv = document.getElementById("game");
    let board = document.createElement("div");
    board.id = "board";
    for(i = 0; i < width; i++) {
        let line = document.createElement("div");
        line.className = "line";
        for (let j = 0; j < height; j++) {
            let space = document.createElement("div");
            space.className = "space state-0";
            space.id = `${i},${j}`;
            space.onclick = function() { setStateWithElement(this, 1); };
            line.append(space);
        }
        board.append(line);
    }
    gameDiv.append(board);
    console.log("finished generating board");
}

function getAlive() { return alive_cells; }

function setStateWithPos(x, y, state) {
    updateAliveCellsForSetStace(x, y, state);

    space = getSpace(x, y);
    setAnimationsForSetState(space, state);
}
function setStateWithElement(space, state) {
    let x = parseInt(space.id.split(','),10);
    let y = parseInt(space.id.split(','),10);
    updateAliveCellsForSetStace(x, y, state);
    setAnimationsForSetState(space, state);
}
function updateAliveCellsForSetStace(x, y, state) {
    if(state == 0) {
        alive_cells.delete([x,y]);
    } else {
        alive_cells.set([x,y],state);
    }
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
    map.forEach((value, coord) => {
        //coord[0] is x, coord[1] is y
        if(coord[0] >= 0 && coord[0] < board_width && coord[1] >= 0 && coord[1] < board_height) {
            setStateWithPos(coord[0],coord[1], 0);
        }
    });
}

// void subtractMap(Map)
function addMap(map) {
    map.forEach((value, coord) => {
        //coord[0] is x, coord[1] is y
        if(coord[0] >= 0 && coord[0] < board_width && coord[1] >= 0 && coord[1] < board_height) {
            setStateWithPos(coord[0],coord[1], 1);
        }
    });
}

function doStep() {
    console.log("Before:");
    console.log(alive_cells);
    let new_alive_cells = step(alive_cells);
    subtractMap(alive_cells);
    addMap(new_alive_cells);
    alive_cells = new_alive_cells;
    console.log("After:");
    console.log(alive_cells);
}
const DEAD_BG = "#00000040";

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
            space.classList.add("space");
            space.id = `${i},${j}`;
            space.onclick = function() { setState(this, 1); };
            line.append(space);
        }
        board.append(line);
    }
    gameDiv.append(board);
    console.log("finished generating board");
}

function getAlive() { return alive_cells; }

function setState(x, y, state) {
    space = getSpace(x, y);
    space.className = `space state-${state}`;
}
function setStateElem(space, state) {
    space.className = `space state-${state}`;
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
            document.getElementById(`${coord[0]},${coord[1]}`).style.background = DEAD_BG;
        }
    });
}

// void subtractMap(Map)
function addMap(map) {
    map.forEach((value, coord) => {
        //coord[0] is x, coord[1] is y
        if(coord[0] >= 0 && coord[0] < board_width && coord[1] >= 0 && coord[1] < board_height) {
            setState(document.getElementById(`${coord[0]},${coord[1]}`), 1);
        }
    });
}
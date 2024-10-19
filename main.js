let boardExists = false;
let board_height;
let board_width;
let board_state = []; // vec<vec<number>>
let alive_cells = []; // vec<number> where number is a coordinate: x = number%width, y = number/width

function DoSomething(that) {
    console.log("Wow");
    that.innerHTML =  ">.<";
}

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
            space.onclick = function() { changeState(this); };
            line.append(space);
        }
        board.append(line);
    }
    gameDiv.append(board);
    console.log("finished generating board");
}

function changeState(space) {
    console.log(space);
    space.style.background = getRandomColor();
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
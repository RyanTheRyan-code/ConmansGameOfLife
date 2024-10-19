boardExists = false;

function DoSomething(that) {
    console.log("Wow");
    console.log(that);
    that.innerHTML =  ">.<";
}

function generateBoard(width=16, height=16) {
    if(boardExists) return;
    boardExists = true;

    gameDiv = document.getElementById("game");
    board = document.createElement("div");
    board.className = "board";
    for(i = 0; i < width; i++) {
        line = document.createElement("div");
        line.className = "line";
        for (let j = 0; j < height; j++) {
            space = document.createElement("div");
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
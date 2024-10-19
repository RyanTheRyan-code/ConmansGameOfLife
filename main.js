boardExists = false;

function DoSomething(that) {
    console.log("Wow");
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
            space.className = "space";
            line.append(space);
        }
        board.append(line);
    }
    gameDiv.append(board);
    console.log("done");
}
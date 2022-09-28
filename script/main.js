window.onload = function () {
    CreateBoard();
}
let num = 8;
function CreateBoard() {
    // num = document.getElementById("num").value;
    let board = document.querySelector("#board");
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
    for (let c = 0; c < num; c++) {
      let columnDiv = document.createElement("div");
      columnDiv.setAttribute("id", "column" + (c + 1));
      columnDiv.classList.add("column");
      board.append(columnDiv);
      for (let f = 0; f < num; f++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("id", f + 1 + "-" + (c + 1));
        newDiv.setAttribute("data-testid", f + 1 + "-" + (c + 1));
        newDiv.setAttribute("onclick", "CheckCell(id)");
        newDiv.classList.add("cell");
        document.querySelector("#column" + (c + 1)).append(newDiv);
      }
    }
  }
  
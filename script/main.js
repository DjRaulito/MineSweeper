window.onload = function () {
  if (window.location.search.includes("?")){
    GenerateMockData();    
  }
  CreateBoard();
  ShowBoard()
};
let columns = 8;
let rows = 8;
let arrayBoard;
function CreateBoard() {
  arrayBoard = new Array(rows);
  for (let c = 0; c < columns; c++) {
    arrayBoard[c] = new Array(columns);
  }
}
function ShowBoard() {
  for (let c = 0; c < columns; c++) {
    let column = document.createElement("div");
    column.setAttribute("id","column" +(c + 1));
    document.getElementById("board").append(column);
    for (let f = 0; f < rows; f++) {
      arrayBoard[c][f] = document.createElement("div");
      arrayBoard[c][f].setAttribute("id", f + 1 + "-" + (c + 1));
      arrayBoard[c][f].setAttribute("data-testid", f + 1 + "-" + (c + 1));
      arrayBoard[c][f].classList.add("hiddenCell");
      document.getElementById("column" + (c + 1)).append(arrayBoard[c][f]);
    }
  }  
}
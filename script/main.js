window.onload = function () {
  if (window.location.search.includes("?")) {
    GenerateMockData();
  }
  CreateBoardInformation();
  CreateBoard();
  ShowBoard();
};
let columns = 8;
let rows = 8;
let arrayBoard;
let arrayInformation = [];
function CreateBoard() {
  arrayBoard = new Array(rows);
  for (let c = 0; c < columns; c++) {
    //guardar informacion mina bandera
    arrayBoard[c] = new Array(columns);
  }
}
function CreateBoardInformation() {
  for (let column = 0; column < columns; column++) {
    arrayInformation.push([]);
    for (let row = 0; row < rows; row++) {
      arrayInformation[column].push(column + "-" + row);
    }
  }
  console.log(arrayInformation);
}
function ShowBoard() {
  while (document.getElementById("board").firstChild) {
    document
      .getElementById("board")
      .removeChild(document.getElementById("board").firstChild);
  }
  for (let c = 0; c < columns; c++) {
    let column = document.createElement("div");
    column.setAttribute("id", "column" + c);
    document.getElementById("board").append(column);
    for (let f = 0; f < rows; f++) {
      arrayBoard[c][f] = document.createElement("div");
      arrayBoard[c][f].setAttribute("id", c + "-" + f);
      arrayBoard[c][f].setAttribute("data-testid", c + "-" + f);
      arrayBoard[c][f].classList.add("hiddenCell");
      document.getElementById("column" + c).append(arrayBoard[c][f]);
      ShowUpdloadBoard(c, f);
    }
  }
}
function ShowUpdloadBoard(c, f) {
  switch (arrayInformation[c][f]) {
    case "exposed":
      arrayBoard[c][f].classList.add("exposed");
      break;
    case "mined":
      arrayBoard[c][f].classList.add("mined");
      break;
    default:
      break;
  }
}

function GenerateMockData() {
  let url = window.location.search.split("?");
  let MockData = url[1].split("-");
  rows = MockData.length;
  columns = MockData[0].length;
}

document.addEventListener("click", (event) => {
  let cell = event.target.id;
  cell = cell.split("-");
  let column = cell[0];
  let row = cell[1];
  // modificar el array y ponerla exposed y atraves de eso cambiar la clase
  arrayInformation[column][row] = "exposed";
  ShowBoard();
});
window.onload = function () {
  if (window.location.search.includes("?")) {
    GenerateMockData();
    PlaceMines();
  } else {
    CreateBoardInformation();
  }
  ShowBoard();
};
let columns = 8;
let rows = 8;
let arrayBoard;
let lastRowMinedPosition;
let lastColumnMinedPosition;
const numMines = 10;
let minesPlaced = 0;
let cellsRevealed = 0;
let arrayInformation = [];

let defaultCellValues = {
  columnY: 0,
  rowX: 0,
  isRevealed: false,
  userTag: " ",
  isMine: false,
  numberOfMinesAround: 0,
};

// objeto rows,colums si esta minada, numeros de minas,
function CreateBoardInformation() {
  for (let row = 0; row < rows; row++) {
    arrayInformation.push([]);
    for (let column = 0; column < columns; column++) {
      arrayInformation[row].push({
        ...defaultCellValues,
        rowX: row,
        columnY: column,
      });
    }
  }
  console.log(arrayInformation);
  if (!window.location.search.includes("?")) {
    PlaceMinesRandom();
  } else {
    PlaceMinesMockData();
  }
}

function ShowBoard() {
  DeleteBoard();
  for (let r = 0; r < rows; r++) {
    let row = document.createElement("div");
    row.setAttribute("id", "row" + r);
    document.getElementById("board").append(row);
    for (let c = 0; c < columns; c++) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("id", r + "-" + c);
      newDiv.setAttribute("data-testid", r + "-" + c);
      newDiv.classList.add("hiddenCell");
      newDiv.classList.add("cell");
      newDiv.classList.add("enabled");

      //click
      newDiv.addEventListener("click", (event) => {
        let cell = event.target.id;
        cell = cell.split("-");
        let row = cell[0];
        let column = cell[1];
        if (arrayInformation[row][column].isRevealed == false) {
          if (arrayInformation[row][column].isMine) {
            arrayInformation[row][column].isRevealed = true;
            RevealAllMines();
            DisableBoard();
          } else {
            arrayInformation[row][column].isRevealed = true;
            cellsRevealed++;
            NumAdjacentMines(r, c);
            RevealAdjacentCells(r, c);
            ShowBoard();
            GameStatus(r, c);
          }
        } else {
        }
      });
      newDiv.addEventListener("contextmenu", (event) => {
        event.preventDefault();
        TaggCell(r, c);
      });
      document.getElementById("row" + r).append(newDiv);
      ShowUpdloadBoard(r, c);
    }
  }
}
function DeleteBoard() {
  while (document.getElementById("board").firstChild) {
    document
      .getElementById("board")
      .removeChild(document.getElementById("board").firstChild);
  }
}
function ShowUpdloadBoard(r, c) {
  let cell = document.getElementById(r + "-" + c);
  if (
    arrayInformation[r][c].isMine == true &&
    arrayInformation[r][c].isRevealed == true
  ) {
    cell.classList.add("mined");
    cell.classList.remove("hiddenCell");
    cell.classList.add("unHiddenCell");
    cell.innerHTML = "&#128163";
    GameStatus(r, c);
  } else if (arrayInformation[r][c].isRevealed == true) {
    NumAdjacentMines(r, c);
    RevealAdjacentCells(r, c);
    cell.classList.add("exposed");
    cell.classList.remove("hiddenCell");
    cell.classList.add("unHiddenCell");
    cell.innerHTML = arrayInformation[r][c].numberOfMinesAround;
    // GameStatus(r, c);
  }
}

function GenerateMockData() {
  let url = window.location.search.split("?");
  let MockData = url[1].split("-");
  rows = MockData.length;
  columns = MockData[0].length;
  return MockData;
}

function PlaceMines() {
  if (window.location.search.includes("?")) {
    CreateBoardInformation();
  } else {
    CreateBoardInformation();
  }
}

function PlaceMinesRandom() {
  for (let i = 0; i < numMines; i++) {
    let rowMinedPosition = Math.floor(Math.random() * (rows + 1 - 1));
    let columnMinedPosition = Math.floor(Math.random() * (columns + 1 - 1));
    if (
      arrayInformation[rowMinedPosition][columnMinedPosition].isMine == true
    ) {
      i--;
    }
    arrayInformation[rowMinedPosition][columnMinedPosition].isMine = true;
    minesPlaced = i + 1;
  }
  UploadMinesCounter();
}

function PlaceMinesMockData() {
  let MockData = GenerateMockData();
  for (let r = 0; r < MockData.length; r++) {
    for (let c = 0; c < MockData.length; c++) {
      if (MockData[r].charAt(c) == "*") {
        arrayInformation[r][c].isMine = true;
        minesPlaced++;
      }
    }
  }
  UploadMinesCounter();
}

function UploadMinesCounter() {
  document.getElementById("flagCounter").innerHTML = minesPlaced;
}
function GameStatus(row, column) {
  if (arrayInformation[row][column].isMine) {
    document.getElementById("face").innerHTML = "sad";
  } else if (cellsRevealed == rows * columns - minesPlaced) {
    document.getElementById("face").innerHTML = "happy";
    TagAllMines(row, column);
  }
}

function RevealAllMines() {
  for (let r = 0; r < arrayInformation.length; r++) {
    for (let c = 0; c < arrayInformation.length; c++) {
      if (arrayInformation[r][c].isMine) {
        arrayInformation[r][c].isRevealed = true;
        ShowUpdloadBoard(r, c);
      }
    }
  }
}

function NumAdjacentMines(r, c) {
  let numMinesSurrounding = 0;
  for (let row = 0; row < 3; row++) {
    for (let column = 0; column < 3; column++) {
      try {
        if (arrayInformation[r - 1 + row][c - 1 + column].isMine == true) {
          numMinesSurrounding++;
          arrayInformation[r][c].numberOfMinesAround = numMinesSurrounding;
        }
      } catch {
        // console.log("eres bobo que te sales del rango anda");
      }
    }
  }
}
function RevealAdjacentCells(r, c) {
  if (arrayInformation[r][c].numberOfMinesAround == 0) {
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        try {
          if (arrayInformation[r - 1 + row][c - 1 + column].isMine == false) {
            arrayInformation[r - 1 + row][c - 1 + column].isRevealed = true;
            NumAdjacentMines(r - 1 + row, c - 1 + column);
          }
        } catch {
          // console.log("eres bobo que te sales del rango anda");
        }
      }
    }
  }
}

function TaggCell(row, column) {
  let cellClicked = document.getElementById(row + "-" + column);
  if (cellClicked.innerHTML == "") {
    cellClicked.innerHTML = "🚩";
    minesPlaced--;
  } else if (cellClicked.innerHTML == "🚩") {
    minesPlaced++;
    minesPlaced--;
    cellClicked.innerHTML = "&#63;";
  } else if (cellClicked.innerHTML == "&#63;") {
    cellClicked.innerHTML = "";
  } else {
    cellClicked.innerHTML = "";
  }
  UploadMinesCounter();
}

function TagAllMines() {
  for (let r = 0; r < arrayInformation.length; r++) {
    for (let c = 0; c < arrayInformation.length; c++) {
      if (arrayInformation[r][c].isMine) {
        TaggCell(r, c);
      }
    }
  }
}

function DisableBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
    document.getElementById(r+"-"+c).classList.remove("enabled");
    document.getElementById(r+"-"+c).classList.add("disabled");
    }
  }
}

// we want to put cells in our grid following the design.png diagram

// we initialize our grid array
const grid = [];

// we initialize our location-values
let rowValue;
let columnValue;
let areaValue;

// we give an initial value to our column value number && initialize the other
let rowValueNum;
let columnValueNum = null;
let areaValueNum;

for (let i = 1; i < 82; i++) {
  // we give the rowValue to our current cell
  if (i % 9 === 0) {
    rowValueNum = i / 9;
  } else {
    rowValueNum = Math.floor(i / 9 + 1);
  }
  rowValue = `R${rowValueNum}`;
  // we give the columnValue to our current cell
  columnValueNum += 1;
  if (columnValueNum > 9) {
    columnValueNum = 1;
  }
  columnValue = `C${columnValueNum}`;
  // we give the areaValue to our current cell
  if (rowValueNum < 4) {
    if (columnValueNum < 4) {
      areaValueNum = 1;
    } else if (columnValueNum < 7) {
      areaValueNum = 2;
    } else {
      areaValueNum = 3;
    }
  } else if (rowValueNum < 7) {
    if (columnValueNum < 4) {
      areaValueNum = 4;
    } else if (columnValueNum < 7) {
      areaValueNum = 5;
    } else {
      areaValueNum = 6;
    }
  } else {
    if (columnValueNum < 4) {
      areaValueNum = 7;
    } else if (columnValueNum < 7) {
      areaValueNum = 8;
    } else {
      areaValueNum = 9;
    }
  }
  areaValue = `A${areaValueNum}`;

  // we then build our cell with those values along with other properties
  grid.push({
    id: i,
    row: rowValue,
    column: columnValue,
    area: areaValue,
    numValue: 0,
    filled: false,
    shown: false,
    onFocus: false
  });
}

// we'll start by feeding our grid with valide numValues and we'll then want to shuffle the answer
let initialValues = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [4, 5, 6, 7, 8, 9, 1, 2, 3],
  [7, 8, 9, 1, 2, 3, 4, 5, 6],
  [2, 3, 4, 5, 6, 7, 8, 9, 1],
  [5, 6, 7, 8, 9, 1, 2, 3, 4],
  [8, 9, 1, 2, 3, 4, 5, 6, 7],
  [3, 4, 5, 6, 7, 8, 9, 1, 2],
  [6, 7, 8, 9, 1, 2, 3, 4, 5],
  [9, 1, 2, 3, 4, 5, 6, 7, 8]
];

function shuffleRows(newArray, initialArray) {
  let firstRandomValue = Math.floor(Math.random() * 3);
  let secondRandomValue = Math.floor(Math.random() * 2);
  let thirdRandomValue = Math.floor(Math.random() * 3);
  let fourthRandomValue = Math.floor(Math.random() * 2);
  let fifthRandomValue = Math.floor(Math.random() * 3);
  let sixthRandomValue = Math.floor(Math.random() * 2);

  newArray.push(initialArray[firstRandomValue]);
  initialArray.splice(firstRandomValue, 1);

  newArray.push(initialArray[secondRandomValue]);
  initialArray.splice(secondRandomValue, 1);

  newArray.push(initialArray[0]);
  initialArray.splice(0, 1);
  //
  newArray.push(initialArray[thirdRandomValue]);
  initialArray.splice(thirdRandomValue, 1);

  newArray.push(initialArray[fourthRandomValue]);
  initialArray.splice(fourthRandomValue, 1);

  newArray.push(initialArray[0]);
  initialArray.splice(0, 1);
  //
  newArray.push(initialArray[fifthRandomValue]);
  initialArray.splice(fifthRandomValue, 1);

  newArray.push(initialArray[sixthRandomValue]);
  initialArray.splice(sixthRandomValue, 1);

  newArray.push(initialArray[0]);
  initialArray.splice(0, 1);
}

let shuffledRows = [];
shuffleRows(shuffledRows, initialValues);

// columns to rows
let columnsToRows = [[], [], [], [], [], [], [], [], []];

for (let i = 0; i < 9; i++) {
  shuffledRows.forEach(row => {
    columnsToRows[i].push(row[i]);
  });
}

let finalValues = [];
shuffleRows(finalValues, columnsToRows);

let values = [];

finalValues.forEach(row => {
  for (let i = 0; i < 9; i++) {
    values.push(row[i]);
  }
});

// we connect our finalValues to our grid
for (let i = 0; i < 81; i++) {
  grid[i].numValue = values[i];
}

// we make the view for our Sudoku
const app = document.getElementById("app");

function setFocus(e) {
  e.target.classList.add("focused-primary");
  let cell_id = e.target.id;
  grid.forEach(cell => (cell.onFocus = false));
  let focusedRow = grid[cell_id - 1].row;
  let focusedColumn = grid[cell_id - 1].column;
  grid.forEach(cell => {
    cell.row === focusedRow ? (cell.onFocus = true) : "";
    cell.column === focusedColumn ? (cell.onFocus = true) : "";
  });
  draw();
}

function draw() {
  app.innerHTML = ``;
  app.innerHTML = `
    <div class="deck">
      ${grid
        .map(
          cell => `
        <div
          id="${cell.id}"
          class="
            cell
            ${cell.row}
            ${cell.column}
            ${cell.area}
            ${cell.shown ? `visible` : ``}
            ${cell.onFocus ? `focused` : ``}
          "
          onclick="setFocus(event)"
        >
         ${cell.numValue != 0 ? cell.numValue : ""}
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

draw();

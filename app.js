// we want to put cells in our deck following the design.png diagram

// we initialize our deck array
const deck = [];

// we initialize our location-values
let rowValue;
let columnValue;
let areaValue;

// we give an initial value to our column value number && initialize the other
let columnValueNum = null;
let rowValueNum;
let areaValueNum;

for (let i = 1; i < 82; i++) {
  // we give the rowValue to our current cell
  if(i % 9 === 0) {
    rowValueNum = i / 9;
  } else {
    rowValueNum = Math.floor(i / 9 + 1);
  }
  rowValue = `R${rowValueNum}`;
  // we give the columnValue to our current cell
  columnValueNum += 1;
  if(columnValueNum > 9) {
    columnValueNum = 1;
  };
  columnValue = `C${columnValueNum}`;
  // we give the areaValue to our current cell
  if(rowValueNum < 4) {
    if(columnValueNum < 4) {
      areaValueNum = 1;
    } else if(columnValueNum < 7) {
      areaValueNum = 2;
    } else {
      areaValueNum = 3;
    }
  } else if(rowValueNum < 7) {
    if(columnValueNum < 4) {
      areaValueNum = 4;
    } else if(columnValueNum < 7) {
      areaValueNum = 5;
    } else {
      areaValueNum = 6;
    }
  } else {
    if(columnValueNum < 4) {
      areaValueNum = 7;
    } else if(columnValueNum < 7) {
      areaValueNum = 8;
    } else {
      areaValueNum = 9;
    };
  };
  areaValue = `A${areaValueNum}`;

  // we then build our cell with those values along with other properties
  deck.push({
    id: i,
    row: rowValue,
    column: columnValue,
    area: areaValue,
    numValue: 0,
    filled: false,
    shown: false,
    onFocus: false
  });
};

function populate() {

  // deck.forEach  => cell
  // make an array "availableValues" of values from 1 to 9
  // make an array "rowValues" of the same row cells numValues
  // make an array "columnValues" of the same column cells numValues
  // make an array "areaValues" of the same area cells numValues
  // concat those 3 arrays to a new "commitedValues" array ----> commitedValues = [...rowValues, ...columnValues, ...areaValues]
  // for 9 turns =>
  // give the current cell one of the array values randomly
  // remove that value from the "availableValues" array
  // check if the "commitedValues" array includes the attributed numValue
  // if it doesn't, return;

   deck.forEach(cell => {
    cell.numValue = Math.floor(Math.random() * 9 + 1);
    });
}
populate();

// we make the view for our Sudoku
const app = document.getElementById("app");

function setFocus(e) {
  e.target.classList.add("focused-primary");
  let cell_id = e.target.id;
  deck.forEach(cell => cell.onFocus = false);
  let focusedRow = deck[cell_id - 1].row;
  let focusedColumn = deck[cell_id - 1].column;
  deck.forEach(cell => {
    cell.row === focusedRow ? cell.onFocus = true : "";
    cell.column === focusedColumn ? cell.onFocus = true : "";
  });
  draw();
}

function draw() {
  app.innerHTML = ``;
  app.innerHTML = `
    <div class="deck">
      ${deck.map(cell => `
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
      `).join("")}
    </div>
  `;
}

draw();
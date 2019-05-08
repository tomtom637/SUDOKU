/**
 * Shuffle an array in place
 * (Fisher-Yates shuffle)
 */
Array.prototype.shuffle = function() {
  for (let i = 0; i < this.length - 1; i++) {
    let index = ~~(Math.random() * (this.length - i)) + i;
    let x = this[i];
    this[i] = this[index];
    this[index] = x;
  }
};



// we want to put cells in our grid following the design.png diagram

// we initialize our grid array
const grid = [];

// We want to log the number of reloads our Generator needed to succeed
let reloads = 0;

for (let i = 0; i < 81; i++) {
  // we give the rowValue to our current cell
  // we then build our cell with those values along with other properties
  let row = ~~(i / 9);
  let col = i % 9;

  grid.push({
    id: i,
    row: `R${row + 1}`,
    column: `C${col + 1}`,
    area: `A${3 * ~~(row / 3) + ~~(col / 3) + 1}`,
    numValue: undefined,
    filled: false,
    shown: false,
    onFocus: false,
    possibleValues: undefined,
  });
}

// We want to populate our SUDOKU grid with values following the game's rules
function populate() {
  for(let cell of grid) {
    cell.numValue = undefined;
  }

  let unassignedCells = [...grid];
  unassignedCells.shuffle();

  while(unassignedCells.length > 0) {
    // update possible values for each unassigned cell
    for (let cell of unassignedCells) {
      cell.possibleValues = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      grid
          .filter(c => c.row === cell.row || c.column=== cell.column || c.area=== cell.area)
          .forEach(c => cell.possibleValues.delete(c.numValue));
    }

    unassignedCells.sort((c1, c2) => c1.possibleValues.size - c2.possibleValues.size);
    let cell = unassignedCells.shift();

    if (cell.possibleValues.size === 0) {
      reloads += 1;
      return false;
    }

    let availableValues = Array.from(cell.possibleValues);
    cell.numValue = availableValues[~~(Math.random() * availableValues.length)];
  }
  return true;
}

while (!populate()) {}

// we log the total reloads that were needed to get it right
console.log(`${reloads} reloads were needed to get it right`);

// we make the view for our Sudoku
const app_last = document.getElementById("app");

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
  app_last.innerHTML = ``;
  app_last.innerHTML = `
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

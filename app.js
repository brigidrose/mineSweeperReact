'use strict';
let convert = {};

convert.newGrid = function (rows, cols) {
  let grid = [];
//create rows
  for (let i = 0; i < rows; i++) {
    let row = [];
    //add row array to grid array
    grid.push(row);
    //create columns
    for (let j = 0; j < cols; j++) {
      row.push({
        //list out inner cell properties
        isClicked : false,
        hasFlag : false,
        hasMine : false,
        neighborCount : 0
      });
    }
  }
  return grid;
};

//countNeighbors function

convert.countNeighbors = function (grid, i, j) {
  let mines = 0;
  let rows = grid.length;
  let cols = grid[0].length;
  //checking one up, self and one down
  for (let x of [i - 1, i, i + 1]) {
    //if one of those cells is less than zero or >= 9 AKA of grid
    if (x < 0 || x >= rows) {
      // go to next for
      continue;
    }
    // checking one to the left, self, one to the right
    for (let y of [j - 1, j, j + 1]) {
      // if y<0 or >=9 or x is equal to self and y===self
      if (y < 0 || y >= cols || (x === i && y === j)) {
        //go to next condition
        continue;
      }
      //
      if (grid[x][y].hasMine) {
        mines += 1;
      }
    }
  }
  return mines;
}


module.exports = convert;
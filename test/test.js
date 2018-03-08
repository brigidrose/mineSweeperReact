'use strict';
let convert = require('../app.js')
let assert = require('assert');
let expect = require('chai').expect


describe('countNeighbors', function () {
  it('should return the correct value', function () {
    let grid = convert.newGrid(8, 8);
    grid[1][1].hasMine = true;
    grid[1][2].hasMine = true;
    grid[2][2].hasMine = true;
    expect(convert.countNeighbors(grid, 2,1)).to.equal(3);
    expect(convert.countNeighbors(grid, 0,1)).to.equal(2);
    expect(convert.countNeighbors(grid, 1,0)).to.equal(1);
  });
});

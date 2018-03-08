import React from "react";
import ReactDOM from "react-dom";

//minesweeper code
// STEPS:
// 1) Creat minesweeper grid (array of arrays). (done)
// 2) Populate grid with mines. (done)
// 3) Populate grid with numbers of neighboring mines. (done)
// 4) Write flood fill recursion code. (done)
// 5) Create game logic...
//     a) onClick start timer.(done)
//     b) determine if clicked cell is mine, number, or zero.(done)
//         -mine = end game pop up. end timer. restart game.(done)
//         -number = single cell reveal. (done)
//         -zero = implement flood fill recursion. (done)
//     c) right click to add flag. (done)
// 6) Style everything. (done)
// 7) Write tests. (oooooff. not really done. Dog ate my homework?)
// 8) Refactor/ cruft removal. (done)


let rows = 9;
let cols = 9;
let mineCount = 10;

//create minesweeper game grid

//create grid array
let grid; 

function newGrid(){ 
  grid = [];
//create rows
console.log(rows);
for (let i = 0; i < rows; i++){
    let row = [];
    //add row array to grid array
    grid.push(row);
    //create collums
    for (let j = 0; j < cols; j++){
        row.push({
        //list out inner cell properties
        isClicked: false,
        hasFlag: false,
        hasMine: false,
        neighborCount: 0
        });
    }
}
}

//place mines
function placeMines(){
//mine count starts at zero
  let counter = 0;
//while we have place less than 10 mines
  while(counter < mineCount){
    //math for placing mines at random x/y cooridnates
    let x = Math.floor(Math.random() * rows);
    let y = Math.floor(Math.random() * cols);
    //logic to make sure mines aren't placed on the same spot twice. 
    //this would make an angry infinite loop.
    if(grid[x][y].hasMine === false){
        grid[x][y].hasMine = true;
        counter++;
    }
  }

  for (let i = 0; i < rows; i++){
    for (let j = 0; j < cols; j++){
      grid[i][j].neighborCount = countNeighbors(i,j);
    }
  }
}

//check for neighboring mines
//check neighbor cells for bombs and generate bomb count number
function countNeighbors(i,j) {
  //zero mines to start
  let mines = 0;
  //checking one up, self and one down
  for (let x of [i-1,i,i+1]) {
    //if one of those cells is less than zero or >= 9 AKA of grid
    if (x<0 || x>=rows) {
        // go to next for
      continue;
    }
    // checking one to the left, self, one to the right
    for (let y of [j-1,j,j+1]) {
        // if y<0 or >=9 or x is equal to self and y===self
      if (y<0 || y>=cols || (x===i && y===j)) {
        //go to next condition
        continue;
      }
      //
      if (grid[x][y].hasMine) {
        mines+=1;
      }
    }
  }
  return mines;
}

 //Flood Fill
  function floodFill(i,j) {
    grid[i][j].isClicked = true;
    if (grid[i][j].bomb) {
        // alert("you lose!");
        return;
    }
    if (grid[i][j].neighborCount===0) {
        for (let x of [i-1,i,i+1]) {
            if (x<0 || x>=rows) {
                continue;
            }
            for (let y of [j-1,j,j+1]) {
                if (y<0 || y>=cols) {
                    continue;
                } else if (grid[x][y].isClicked) {
                    continue;
                } else {
                    floodFill(x,y);
                }
            }
        }
    }
}

//react code

let destination = document.querySelector("#container")
//there is an outer array, that contains an array of divs. 
//each array of divs contains an array of buttons
//in react, every array needs a key or react gets angry.

class Board extends React.Component{
    constructor(props,context){
        super(props,context);
        this.state = {
            seconds: 0,
            active: null,
            lostGame: false
        }
        newGrid();
        placeMines();
    }
    reveal(i,j) {  
        if (this.state.lostGame) {
            return;
        }
        grid[i][j].isClicked = true;
        floodFill(i,j);
        this.forceUpdate();
        if (grid[i][j].hasMine===true){
            alert("Oops! Try again!");
            for (let i = 0; i < rows; i++){
                for (let j = 0; j < cols; j++){
                    grid[i][j].isClicked = true;
                }
            }
            this.setState({lostGame: true});
            this.stopTimer();
        }
        if (this.state.active===null) {
            this.startTimer();
        }
  
    }

    flag(e,i,j) {
        e.preventDefault();
        if (this.state.lostGame) {
            return;
        }
        //toggle
        grid[i][j].hasFlag = !grid[i][j].hasFlag;
        this.forceUpdate();
    }

    startTimer() {
        //if this.reveal === true
         if (!this.state.active) {
          //use staby lambda thing to void this/that debacle
            let active = setInterval(()=>(this.setState({seconds: this.state.seconds+1})),1000);
            this.setState({active: active});
        }

    }

    stopTimer() {
        clearInterval(this.state.active);
        this.setState({active: null});
    
    }

    newGame() {
        this.stopTimer();
        this.setState({lostGame: false, seconds: 0});
        let level = document.getElementById('level').selectedIndex;
        console.log(level);
        console.log(typeof(level));
        if(level === 0){
            //start beginner
            rows = 8;
            cols = 8;
            mineCount = 10;
        } 
        else if (level === 1){
            //start intermediate
            rows = 16;
            console.log(rows)
            cols = 16;
            console.log(cols)
            mineCount = 40;
        } 
        else if (level === 2){
            //start advanced
            rows = 30;
            cols = 16;
            mineCount = 99;
        }
        newGrid();
        placeMines();
    }

    
    render() {
        let rows = [];

        for (let i=0; i < grid.length; i++){
            let buttons = [];
            rows.push([<div key={i}>{buttons}</div>]);

            for (let j=0; j < grid[i].length; j++){
                let symbol;
                
                if (grid[i][j].isClicked === false){
                    if(grid[i][j].hasFlag === true){
                        symbol ="\u{1F6A9}"
                    }else{
                        symbol = "?"
                    }
                } else if (grid[i][j].hasMine){
                    symbol = "\u{1F4A5}"
                } else if (grid[i][j].neighborCount > 0){
                    symbol = grid[i][j].neighborCount
                } else if(grid[i][j].neighborCount === 0){
                    symbol = "."

                }
                buttons.push(
                    
                    <button symbol={symbol} 
                    className="cell" 
                    key={j}
                    onContextMenu= {(e) => this.flag(e,i,j)}
                    onClick={(e) => this.reveal(i,j)}>
                    {symbol}
                    </button>    
                )
            }
        }

        return(
            <div>
                <h2>
                    <span>Time:</span>
                    <span className="timer">{this.state.seconds}</span>
                </h2>

                <span>Level:</span>
                <select id ="level">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
                
                <button id="newGame" onClick={()=>{this.newGame(); this.forceUpdate();}} type="button">New Game</button>
              {rows}
            </div>
        );
    
    }
}




ReactDOM.render(
      <div>
      <Board />

      </div>,
      destination
    );



 


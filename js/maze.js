import { Cell } from './cell.js';

class Maze {
  constructor(width, height, cellWidth) {
    this.width = width;
    this.height = height;
    this.cellWidth = cellWidth;
    this.cellArray = [];
    for (let r = 0; r < this.height; r++) {
      let row = []
      for (let c = 0; c < this.width; c++) {
        row.push(new Cell(c, r, cellWidth));
      }

      this.cellArray.push(row);
    }

    // Generate starting cell.
    this.current = this.cellArray[0][0];
    this.current.visited = true;
    this.wallList = [];
    this.addCellWalls(this.current);
  }

  addCellWalls(cell) {
    if (cell.x > 0 && cell.walls[3]) {
      this.wallList.push(new Wall(cell, 3));
    }

    if (cell.x < this.width - 1 && cell.walls[1]) {
      this.wallList.push(new Wall(cell, 1));
    }

    if (cell.y > 0 && cell.walls[0]) {
      this.wallList.push(new Wall(cell, 0));
    }

    if (cell.y < this.height - 1 && cell.walls[2]) {
      this.wallList.push(new Wall(cell, 2));
    }
  }

  getCellWallNeighbor(wall) {
    const cell = wall.cell;
    let neighborX = cell.x;
    let neighborY = cell.y;

    switch (wall.wall) {
      case 0:
        neighborY--;
        break;
      case 1:
        neighborX++;
        break;
      case 2:
        neighborY++;
        break;
      case 3:
        neighborX--;
        break;
      default:
        // Shouldn't get here.
    }

    return this.cellArray[neighborY][neighborX];
  }

  canBreakWall(wall) {
    const neighbor = this.getCellWallNeighbor(wall);
    return !neighbor.visited && wall.cell.visited;
  }

  breakWall(wall) {
    const cell = wall.cell;
    const neighbor = this.getCellWallNeighbor(wall);

    cell.walls[wall.wall] = false;
    neighbor.walls[(wall.wall + 2) % 4] = false;
  }


  mazeStep() {
    if (this.wallList.length != 0) {
      do {
        var wallIndex = Math.floor(Math.random() * this.wallList.length);
        var wall = this.wallList[wallIndex];
        this.wallList.splice(wallIndex, 1);
      } while (!this.canBreakWall(wall) && this.wallList.length != 0);

      if (this.canBreakWall(wall)) {
        this.breakWall(wall);
        const neighbor = this.getCellWallNeighbor(wall);
        neighbor.visited = true;
        this.addCellWalls(neighbor);
      }
      return true;
    } else {
      return false;
    }
  }

  draw() {
    fill(0);
    for (const row of this.cellArray) {
      for (const cell of row) {
        cell.draw();
      }
    }
  
    textSize(14);
    noStroke();
    fill(0);
    text("<- Goal", this.cellWidth * this.width, this.cellWidth * (this.height - .25));
  }
}

class Wall {
  constructor(cell, wall) {
    this.cell = cell;
    this.wall = wall;
  }
}


export { Maze };

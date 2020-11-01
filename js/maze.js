import { Cell } from './cell.js';

class Maze {
  constructor(grid) {
    this.cellArray = grid.cellArray;
    this.height = this.cellArray.length;
    this.width = this.cellArray[0].length;
    this.reset();
  }

  reset() {
    this.completed = false;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.cellArray[i][j].reset();
      }
    }

    // Generate starting cell.
    const current = this.cellArray[0][0];
    current.visited = true;
    this.wallList = [];
    this.addCellWalls(current);
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
    } else {
      this.completed = true;
    }
  }
}

class Wall {
  constructor(cell, wall) {
    this.cell = cell;
    this.wall = wall;
  }
}


export { Maze };

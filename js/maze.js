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
    this.current.current = true;
    this.visitedCells = 1;
    this.stack = [];
  }

  mazeStep() {
    if (this.visitedCells < this.width * this.height) {
      const unvisitedNeighbors = this.getUnvisitedNeighbors(this.current);
      if (unvisitedNeighbors.length != 0) {
        const neighbor = unvisitedNeighbors[Math.floor(Math.random() * unvisitedNeighbors.length)];
        this.stack.push(this.current);
        this.removeWall(this.current, neighbor);
        this.current.current = false;
        this.current = neighbor;
        this.current.visited = true;
        this.current.current = true;
        this.visitedCells += 1;
      } else if (this.stack.length != 0) {
        this.current.current = false;
        this.current = this.stack.pop();
        this.current.current = true;
      }

      return true;
    } else {
      this.current.current = false;
      return false;
    }
  }

  getUnvisitedNeighbors(cell) {
    const neighbors = [];

    if (cell.x > 0) {
      neighbors.push(this.cellArray[cell.y][cell.x - 1]);
    }

    if (cell.x < this.width - 1) {
      neighbors.push(this.cellArray[cell.y][cell.x + 1]);
    }

    if (cell.y > 0) {
      neighbors.push(this.cellArray[cell.y - 1][cell.x]);
    }

    if (cell.y < this.height - 1) {
      neighbors.push(this.cellArray[cell.y + 1][cell.x]);
    }

    return neighbors.filter(cell => !cell.visited);
  }

  removeWall(cellFrom, cellTo) {
    if (cellFrom.x != cellTo.x) {
      const left = cellFrom.x < cellTo.x ? cellFrom : cellTo;
      const right = cellFrom.x < cellTo.x ? cellTo : cellFrom;

      left.walls[1] = false;
      right.walls[3] = false;
    } else {
      const top = cellFrom.y < cellTo.y ? cellFrom : cellTo;
      const bottom = cellFrom.y < cellTo.y ? cellTo : cellFrom;

      top.walls[2] = false;
      bottom.walls[0] = false;
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


export { Maze };

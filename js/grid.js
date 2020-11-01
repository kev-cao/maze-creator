import { Cell } from './cell.js';

class Grid {
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

export { Grid };

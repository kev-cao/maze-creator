class Cell {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.reset();
  }

  reset() {
    this.current = false;
    this.visited = false;
    this.onGoalPath = false; // True if this cell is on the path to the end.
    this.goal = false; // True if this is the goal cell.
    this.distance = Number.MAX_SAFE_INTEGER;
    this.previous = undefined; // The prior cell on the shortest path from the start to this cell.
    this.walls = [true, true, true, true]; // Top, right, bottom, left
  }

  draw() {
    const leftX = this.x * this.width;
    const rightX = this.x * this.width + this.width;
    const topY = this.y * this.width;
    const bottomY = this.y * this.width + this.width;
    const wallCoords = [
      [leftX, topY, rightX, topY],
      [rightX, topY, rightX, bottomY],
      [leftX, bottomY, rightX, bottomY],
      [leftX, topY, leftX, bottomY]
    ];

    if (this.goal) {
      fill(255, 190, 59);
    } else if (this.current) {
      fill(84, 172, 227);
    } else if (this.onGoalPath) {
      fill(0, 255, 0);
    } else if (this.visited) {
      fill(79, 114, 171);
    } else {
      fill(150, 150, 150);
    }
    noStroke();
    rect(leftX, topY, this.width, this.width);

    // Draw marker for the goal.
    if (this.goal) {
      fill(0);
      triangle(leftX, bottomY, leftX, topY, rightX, (topY + bottomY) / 2);
    }

    stroke(0);
    for (let i = 0; i < 4; i++) {
      if (this.walls[i]) {
        line(...wallCoords[i]);
      }
    }

  }
}

export { Cell }

class Cell {
  constructor(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.current = false;
    this.visited = false;
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

    if (this.current) {
      fill(84, 172, 227);
    } else if (this.visited) {
      fill(79, 114, 171);
    } else {
      fill(150, 150, 150);
    }
    noStroke();
    rect(leftX, topY, this.width, this.width);

    stroke(0);
    for (let i = 0; i < 4; i++) {
      if (this.walls[i]) {
        line(...wallCoords[i]);
      }
    }

  }
}

export { Cell }

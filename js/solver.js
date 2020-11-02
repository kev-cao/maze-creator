class Solver {
  constructor(maze) {
    this.cellArray = maze.cellArray;
    for (let i = 0; i < this.cellArray.length; i++) {
      for (let j = 0; j < this.cellArray[0].length; j++) {
        this.cellArray[i][j].visited = false;
      }
    }
    this.current = this.cellArray[0][0];
    this.goal = this.cellArray[this.cellArray.length - 1][this.cellArray[0].length - 1];
    this.current.distance = 0;
    this.toVisit = [this.current];
    this.lastCurrent = this.current;
  }

  solveStep() {
    if (this.toVisit.length != 0 && !this.goal.visited) {
      this.lastCurrent.current = false;
      this.current = this.getNextBestCell();
      this.lastCurrent = this.current;
      this.current.current = true;
      this.current.visited = true;
      const newNeighbors = this.getUnvisitedNeighbors(this.current);

      newNeighbors.forEach(n => {
        const newDistance = this.current.distance + 1;
        if (n.distance > newDistance) {
          n.distance = newDistance;
          n.previous = this.current;
        }

        this.toVisit.push(n);
      });

      if (this.current === this.goal) {
        let backtrack = this.goal;
        while (backtrack.previous) {
          backtrack.onGoalPath = true;
          backtrack = backtrack.previous;
        }
        backtrack.onGoalPath = true;
      }
    }
  }

  getNextBestCell() {
    let min = Number.MAX_SAFE_INTEGER;
    let minCell, minIndex;

    for (let i = 0; i < this.toVisit.length; i++) {
      const c = this.toVisit[i];
      const heuristic = this.goal.x - c.x + this.goal.y - c.y;
      const value = c.distance + heuristic;

      if (value < min) {
        min = value;
        minCell = c;
        minIndex = i;
      }
    };

    this.toVisit.splice(minIndex, 1);
    return minCell;
  }

  getUnvisitedNeighbors(cell) {
    const neighbors = [];
    
    if (!cell.walls[0]) {
      neighbors.push(this.cellArray[cell.y - 1][cell.x]);
    }

    if (!cell.walls[1]) {
      neighbors.push(this.cellArray[cell.y][cell.x + 1]);
    }

    if (!cell.walls[2]) {
      neighbors.push(this.cellArray[cell.y + 1][cell.x]);
    }

    if (!cell.walls[3]) {
      neighbors.push(this.cellArray[cell.y][cell.x - 1]);
    }

    return neighbors.filter(n => !n.visited);
  }
}

export { Solver };

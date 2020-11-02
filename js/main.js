import { Maze } from './maze.js';
import { Solver } from './solver.js';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 800;
const GRID_PIXEL_WIDTH = 900;
const GRID_PIXEL_HEIGHT = 700;
const GRID_WIDTH = 45;
const GRID_HEIGHT = 35;
const CELL_SIZE = Math.floor(Math.min(GRID_PIXEL_WIDTH / GRID_WIDTH, GRID_PIXEL_HEIGHT / GRID_HEIGHT));

let maze, solver;

window.setup = function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  maze = new Maze(GRID_WIDTH, GRID_HEIGHT, CELL_SIZE);
}

window.draw = function draw() {
  background(84, 172, 227);
  maze.draw();

  if (!maze.completed) {
    maze.mazeStep();
  } else {
    if (!solver) {
      solver = new Solver(maze);
    }

    solver.solveStep();
  }
}

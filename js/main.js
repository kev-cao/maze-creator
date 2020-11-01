import { Maze } from './maze.js';
import { Solver } from './solver.js';
import { Grid } from './grid.js';

let canvas_width = 1100;
let canvas_height = 800;
let grid_pixel_width = 900; let grid_pixel_height = 700;
let grid_width = 45;
let grid_height = 35;
let cell_size = Math.floor(Math.min(grid_pixel_width / grid_width, grid_pixel_height / grid_height));

let isGenerating = false;

let grid, maze, solver;

window.setup = function setup() {
  createCanvas(canvas_width, canvas_height);
  grid = new Grid(grid_width, grid_height, cell_size);
  solver = new Solver(grid);
  maze = new Maze(grid);

  // Create buttons.
  let mazeButton = createButton('Generate Maze');
  mazeButton.position(grid_pixel_width + 20, 20);
  mazeButton.mousePressed(createMaze);
}

window.draw = function draw() {
  background(84, 172, 227);
  grid.draw();

  if (isGenerating && !maze.completed) {
    maze.mazeStep();
  } else if (maze.completed) {
    solver.solveStep();
  }
}

function createMaze() {
  if (!isGenerating) {
    maze.reset();
    solver.reset();
    isGenerating = true;
  }
}

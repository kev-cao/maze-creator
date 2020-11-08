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
let isSolving = false;
let showMazeGen = true;

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

  let solveButton = createButton('Solve Maze');
  solveButton.position(grid_pixel_width + 20, 60);
  solveButton.mousePressed(solveMaze);

  let mazeGenCheckBox = createCheckbox('Show Maze Generation', true);
  mazeGenCheckBox.changed(toggleShowMazeGen);
  mazeGenCheckBox.position(grid_pixel_width + 20, 100);
}

window.draw = function draw() {
  grid.draw();


  if (isGenerating && !maze.completed) {
    if (showMazeGen) {
      maze.mazeStep();
    } else {
      while (!maze.completed) {
        maze.mazeStep();
      }
    }

    isGenerating = !maze.completed;
  } else if (isSolving) {
    solver.solveStep();
    isSolving = !solver.completed;
  }
}

function createMaze() {
  maze.reset();
  isGenerating = true;
  isSolving = false;
}

function solveMaze() {
  if (!maze.completed) {
    if (isGenerating) {
      alert('Please wait for the maze to finish generating.');
    } else {
      alert('The maze must be generated first before solving.');
    }
  } else if (isSolving) {
    alert('Solving is currently in progress.');
  } else {
    solver = new Solver(grid);
    isSolving = true;
  }
}

function toggleShowMazeGen() {
  showMazeGen = this.checked();
}

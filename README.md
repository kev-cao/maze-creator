# Maze Creator
A maze creator/solver using Processing.js

## Context
Just a small side project I wanted to try. With my experience as a data structures instructor, I have a lot of experience with the basic graph algorithms, but I have yet to actually implement it in a project. Developing a maze creator and solver seemed like a fun way to implement those algorithms, so I gave it a shot. I originally developed the maze creator using a simple depth-first search traversal, but I realized that the maze became far too simple as there would be incredibly long paths with no diverging forks due to the nature of DFS. Wikipedia mentioned using a modified version of Prim's Algorithm instead, which created far more forks in the paths and made the maze more difficult to solve. The results were reflective of that, so I kept Prim's algorithm. I originally implemented the solver using Dijkstra's Algorithm, but since the distance between cells was always 1, the solving visualization was boring and repetitive. Changing it to the A* Pathfinding Algorithm made the visualization more interesting due to the bias introduced by the heuristic.

## How to Use
The app is available through my website at https://defcoding.github.io/maze-creator.

"use strick";
class GameDisplay {
  updateCells(cell_array) {
    let length_y = cell_array.length,
        length_x = cell_array[0].length,
        y, x;
    // each row
    for (y = 0; y < length_y; y++) {
      length_x = cell_array[y].length;
      // each column in rows
      for (x = 0; x < length_x; x++) {
        // Draw Cell on Canvas
        this.drawCell(cell_array[y][x]);
      }
    }
  }
  drawCell(cell) {
    let ctx = this.ctx;
    // find start point (top left)
    var start_x = cell.x * this.cell_width,
        start_y = cell.y * this.cell_height;
    if (cell.alive) {
      ctx.fillRect(start_x, start_y, this.cell_width, this.cell_height);
    } else {
      ctx.clearRect(start_x, start_y, this.cell_width, this.cell_height);
    }
  }
  constructor(num_cells_x, num_cells_y, cell_width, cell_height, canvas_id) {
    this.canvas = document.getElementById(canvas_id);
    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    this.cell_width = cell_width;
    this.cell_height = cell_height;
    this.num_cells_x = num_cells_x;
    this.num_cells_x = num_cells_x;
    this.width_pixels = num_cells_x * cell_width;
    this.height_pixels = num_cells_y * cell_height;

    this.canvas.width = this.width_pixels;
    this.canvas.height = this.height_pixels;
  }
}

export default GameDisplay

class GameGrid {
  constructor() {
    this.height = 6;
    this.width = 7;
    this.matrix = Array.from(Array(7), () => []);
  }

  add({ x, y, color }) {
    if (!this.isValid({ x, y })) return false;
    this.matrix[y][x] = color;
    return true;
  }

  isAvailable({ x, y }) {
    return typeof this.matrix[y][x] === 'undefined';
  }

  isValid({ x, y }) {
    if (!this.isAvailable({ x, y })) return false;
    if (y === 0) return true;
    return typeof this.matrix[y - 1][x] !== 'undefined';
  }
}

export default GameGrid;

class GameGrid {
  constructor() {
    this.height = 6;
    this.width = 7;
    this.matrix = Array.from(Array(7), () => []);
  }

  add({ x, y, color }) {
    if (!this.isValid({ x, y })) return { isValid: false, isOver: false };
    this.matrix[y][x] = color;
    if (this.isOver({ x, y, color })) {
      return { isValid: false, isOver: true };
    }
    return { isValid: false, isOver: false };
  }

  isAvailable({ x, y }) {
    return typeof this.matrix[y][x] === 'undefined';
  }

  isValid({ x, y }) {
    if (!this.isAvailable({ x, y })) return false;
    if (y === 0) return true;
    return typeof this.matrix[y - 1][x] !== 'undefined';
  }

  isOver({ x, y, color }) {
    if (this.verifyDirection({
      x, y, dir: 'top', num: 0, color,
    })) return true;
    if (this.verifyDirection({
      x, y, dir: 'bot', num: 0, color,
    })) return true;
    if (this.verifyDirection({
      x, y, dir: 'left', num: 0, color,
    })) return true;
    if (this.verifyDirection({
      x, y, dir: 'right', num: 0, color,
    })) return true;
    if (this.verifyDirection({
      x, y, dir: 'top-left', num: 0, color,
    })) return true;
    if (this.verifyDirection({
      x, y, dir: 'top-right', num: 0, color,
    })) return true;
    if (this.verifyDirection({
      x, y, dir: 'bot-left', num: 0, color,
    })) return true;
    if (this.verifyDirection({
      x, y, dir: 'bot-right', num: 0, color,
    })) return true;
    return false;
  }

  verifyDirection({
    x, y, dir, num, color,
  }) {
    switch (dir) {
      case 'top':
        return this.verifyInstance({
          x, y: y + 1, dir, num: num + 1, color,
        });
      case 'bot':
        return this.verifyInstance({
          x, y: y - 1, dir, num: num + 1, color,
        });
      case 'left':
        return this.verifyInstance({
          x: x - 1, y, dir, num: num + 1, color,
        });
      case 'right':
        return this.verifyInstance({
          x: x + 1, y, dir, num: num + 1, color,
        });
      case 'top-right':
        return this.verifyInstance({
          x: x + 1, y: y + 1, dir, num: num + 1, color,
        });
      case 'top-left':
        return this.verifyInstance({
          x: x - 1, y: y + 1, dir, num: num + 1, color,
        });
      case 'bot-left':
        return this.verifyInstance({
          x: x - 1, y: y - 1, dir, num: num + 1, color,
        });
      case 'bot-right':
        return this.verifyInstance({
          x: x + 1, y: y - 1, dir, num: num + 1, color,
        });
      default: return false;
    }
  }

  verifyInstance({
    x, y, dir, num, color,
  }) {
    if (num === 4) return true;
    if (typeof this.matrix[y] === 'undefined' || typeof this.matrix[y][x] === 'undefined') return false;
    if (this.matrix[y][x] === color) {
      return this.verifyDirection({
        x, y, dir, num, color,
      });
    }
    return false;
  }
}

export default GameGrid;

class Cell {
  isAlive: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    isAlive = false
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.isAlive = isAlive || false;
    this.id = new Date().toJSON() + Math.random().toString();
  }

  getNextStatus(cells: Cell[][]): boolean {
    const neighbours = this.getNeighbours(cells);
    const aliveCells = neighbours.filter((c) => c.isAlive).length;

    if (this.isAlive) {
      if (aliveCells < 2 || aliveCells > 3) return false;
      return true;
    } else {
      if (aliveCells === 3) return true;
      return false;
    }
  }

  getNeighbours(cells: Cell[][]): Cell[] {
    const neighbours: Cell[] = [];

    if (this.x > 0) neighbours.push(cells[this.y][this.x - 1]);
    if (this.y > 0) neighbours.push(cells[this.y - 1][this.x]);
    if (this.x < this.width - 1) neighbours.push(cells[this.y][this.x + 1]);
    if (this.y < this.height - 1) neighbours.push(cells[this.y + 1][this.x]);

    if (this.x > 0 && this.y > 0)
      neighbours.push(cells[this.y - 1][this.x - 1]);
    if (this.x < this.width - 1 && this.y < this.height - 1)
      neighbours.push(cells[this.y + 1][this.x + 1]);
    if (this.x < this.width - 1 && this.y > 0)
      neighbours.push(cells[this.y - 1][this.x + 1]);
    if (this.x > 0 && this.y < this.height - 1)
      neighbours.push(cells[this.y + 1][this.x - 1]);

    return neighbours;
  }
}

export default Cell;

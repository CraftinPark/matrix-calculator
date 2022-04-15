export default class Matrix {
  public matrix: number[][];

  public rows: number;

  public columns: number;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.matrix = [];
    for (let r: number = 0; r < rows; r++) {
      let rowArray: number[] = [];
      for (let c: number = 0; c < columns; c++) {
        rowArray.push(0);
      }
      this.matrix.push(rowArray);
    }
  }

  public set(input: number[][]) {
    if (input.length !== this.rows) return Error("matrix dimensions do not match");
    for (let r: number = 0; r < this.rows; r++) if (input[r].length !== this.columns) return Error("matrix dimensions do not match");
    this.matrix = input;
    return this.matrix;
  }
}

import Fraction from "./Fraction";

export default class Matrix {
  public fmatrix: Fraction[][];
  public imatrix: number[][];

  public rows: number;

  public columns: number;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.fmatrix = [];
    for (let r: number = 0; r < rows; r++) {
      let rowArray: Fraction[] = [];
      for (let c: number = 0; c < columns; c++) {
        rowArray.push(new Fraction(0));
      }
      this.fmatrix.push(rowArray);
    }

    this.imatrix = [];
    for (let r: number = 0; r < rows; r++) {
      let rowArray: number[] = [];
      for (let c: number = 0; c < columns; c++) {
        rowArray.push(0);
      }
      this.imatrix.push(rowArray);
    }
  }

  public setIntMatrix(input: number[][]): Fraction[][] | Error {
    if (input.length !== this.rows) return Error("matrix dimensions do not match");
    for (let r: number = 0; r < this.rows; r++) {
      if (input[r].length !== this.columns) return Error("matrix dimensions do not match");
    }
    this.imatrix = input;
    this.fillFracMatrix();
    return this.fmatrix;
  }

  public setFracMatrix(input: Fraction[][]): Fraction[][] | Error {
    if (input.length !== this.rows) return Error("matrix dimensions do not match");
    for (let r: number = 0; r < this.rows; r++) {
      if (input[r].length !== this.columns) return Error("matrix dimensions do not match");
    }
    this.fmatrix = input;
    this.fillIntMatrix();
    return this.fmatrix;
  }

  public fillFracMatrix() {
    for (let r: number = 0; r < this.rows; r++) {
      for (let c: number = 0; c < this.columns; c++) {
        this.fmatrix[r][c] = new Fraction(this.imatrix[r][c]);
      }
    }
  }

  public fillIntMatrix() {
    for (let r: number = 0; r < this.rows; r++) {
      for (let c: number = 0; c < this.columns; c++) {
        this.imatrix[r][c] = this.fmatrix[r][c].simplify();
      }
    }
  }
}

import Matrix from "./Matrix";

export default class MatrixCalculator {
  constructor() {}

  public add(m1: Matrix, m2: Matrix) {
    if (!this.verifySameDimensions(m1, m2)) return Error("matrix dimensions do not match");
    let resultMatrix = new Matrix(m1.rows, m1.columns);
    for (let r: number = 0; r < m1.rows; r++) {
      for (let c: number = 0; c < m1.columns; c++) {
        resultMatrix.matrix[r][c] = m1.matrix[r][c] + m2.matrix[r][c];
      }
    }
    return resultMatrix;
  }

  public subtract(m1: Matrix, m2: Matrix) {
    if (!this.verifySameDimensions(m1, m2)) return Error("matrix dimensions do not match");
    let resultMatrix = new Matrix(m1.rows, m1.columns);
    for (let r: number = 0; r < m1.rows; r++) {
      for (let c: number = 0; c < m1.columns; c++) {
        resultMatrix.matrix[r][c] = m1.matrix[r][c] - m2.matrix[r][c];
      }
    }
    return resultMatrix;
  }

  public scalar_multiply(m: Matrix, n: number) {
    let resultMatrix = new Matrix(m.rows, m.columns);
    for (let r: number = 0; r < m.rows; r++) {
      for (let c: number = 0; c < m.columns; c++) {
        resultMatrix.matrix[r][c] = m.matrix[r][c] * n;
      }
    }
    return resultMatrix;
  }

  public multiply(m1: Matrix, m2: Matrix) {
    if (!this.verifyMultDimensions(m1, m2)) return Error("matrix dimensions are not compatible");
    let resultMatrix = new Matrix(m1.rows, m2.columns);
    for (let r1: number = 0; r1 < m1.rows; r1++) {
      for (let c2: number = 0; c2 < m2.columns; c2++) {
        for (let c1: number = 0; c1 < m1.columns; c1++) {
          resultMatrix.matrix[r1][c2] += m1.matrix[r1][c1] * m2.matrix[c1][c2];
        }
      }
    }
    return resultMatrix;
  }

  public transpose(m: Matrix) {
    let resultMatrix = new Matrix(m.columns, m.rows);
    for (let r: number = 0; r < m.rows; r++) {
      for (let c: number = 0; c < m.columns; c++) {
        resultMatrix.matrix[c][r] = m.matrix[r][c];
      }
    }
    return resultMatrix;
  }

  public verifySameDimensions(m1: Matrix, m2: Matrix) {
    if (m1.rows !== m2.rows || m1.columns !== m2.columns) return false;
    return true;
  }

  public verifyMultDimensions(m1: Matrix, m2: Matrix) {
    if (m1.columns !== m2.rows) return false;
    return true;
  }
}

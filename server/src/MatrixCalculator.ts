import Matrix from "./Matrix";
import { MatrixCalculatorInterface } from "./MatrixCalculatorInterface";
import FractionOperator from "./FractionOperator";

export default class MatrixCalculator implements MatrixCalculatorInterface {
  private fop: FractionOperator;

  constructor() {
    this.fop = new FractionOperator();
  }

  public add(m1: Matrix, m2: Matrix): Matrix | Error {
    if (!this.verifySameDimensions(m1, m2)) return Error("matrix dimensions do not match");
    let resultMatrix: Matrix = new Matrix(m1.rows, m1.columns);
    for (let r: number = 0; r < m1.rows; r++) {
      for (let c: number = 0; c < m1.columns; c++) {
        resultMatrix.fmatrix[r][c] = this.fop.add(m1.fmatrix[r][c], m2.fmatrix[r][c]);
      }
    }
    resultMatrix.fillIntMatrix();
    return resultMatrix;
  }

  public subtract(m1: Matrix, m2: Matrix): Matrix | Error {
    if (!this.verifySameDimensions(m1, m2)) return Error("matrix dimensions do not match");
    let resultMatrix: Matrix = new Matrix(m1.rows, m1.columns);
    for (let r: number = 0; r < m1.rows; r++) {
      for (let c: number = 0; c < m1.columns; c++) {
        resultMatrix.fmatrix[r][c] = this.fop.subtract(m1.fmatrix[r][c], m2.fmatrix[r][c]);
      }
    }
    resultMatrix.fillIntMatrix();
    return resultMatrix;
  }

  public scalar_multiply(m: Matrix, n: number): Matrix | Error {
    let resultMatrix: Matrix = new Matrix(m.rows, m.columns);
    for (let r: number = 0; r < m.rows; r++) {
      for (let c: number = 0; c < m.columns; c++) {
        resultMatrix.fmatrix[r][c] = this.fop.scale(m.fmatrix[r][c], n);
      }
    }
    resultMatrix.fillIntMatrix();
    return resultMatrix;
  }

  public multiply(m1: Matrix, m2: Matrix): Matrix | Error {
    if (!this.verifyMultiplicationDimensions(m1, m2)) return Error("matrix dimensions are not compatible");
    let resultMatrix: Matrix = new Matrix(m1.rows, m2.columns);
    for (let r1: number = 0; r1 < m1.rows; r1++) {
      for (let c2: number = 0; c2 < m2.columns; c2++) {
        for (let c1: number = 0; c1 < m1.columns; c1++) {
          resultMatrix.fmatrix[r1][c2] = this.fop.add(
            resultMatrix.fmatrix[r1][c2],
            this.fop.multiply(m1.fmatrix[r1][c1], m2.fmatrix[c1][c2])
          );
        }
      }
    }
    resultMatrix.fillIntMatrix();
    return resultMatrix;
  }

  public transpose(m: Matrix): Matrix | Error {
    let resultMatrix: Matrix = new Matrix(m.columns, m.rows);
    for (let r: number = 0; r < m.rows; r++) {
      for (let c: number = 0; c < m.columns; c++) {
        resultMatrix.fmatrix[c][r] = m.fmatrix[r][c];
      }
    }
    resultMatrix.fillIntMatrix();
    return resultMatrix;
  }

  public gaussJordanElimination(m: Matrix): Matrix {
    // let resultMatrix: Matrix = new Matrix(m.columns, m.rows);
    // resultMatrix.setFracMatrix(m.fmatrix);
    let rowsLeft = m.rows;
    let columnsLeft = m.columns;
    while (rowsLeft !== 0 && columnsLeft !== 0) {
      this.refactorLowerPivots(m, m.rows - rowsLeft, m.columns - columnsLeft);
      this.eliminateLowerPivots(m, m.rows - rowsLeft, m.columns - columnsLeft);
      this.echelonize(m, m.rows - rowsLeft, m.columns - columnsLeft);
      rowsLeft--;
      columnsLeft--;
    }
    m.fillIntMatrix();
    console.log(m);

    if (!(m instanceof Error)) {
      for (let r = 0; r < m.rows; r++) {
        for (let c = 0; c < m.columns; c++) {
          process.stdout.write(`${m.fmatrix[r][c].numerator}/${m.fmatrix[r][c].denominator}, `);
        }
        console.log("\n");
      }
    }

    return m;
  }

  private refactorLowerPivots(m: Matrix, row: number, column: number): Matrix {
    if (row >= m.rows || column >= m.columns) return m;
    for (let r: number = row; r < m.rows - 1; r++) {
      if (
        !this.fop.isEquivalent(m.fmatrix[row][column], m.fmatrix[r + 1][column]) &&
        m.fmatrix[r + 1][column].numerator !== 0
      ) {
        for (let c: number = m.columns - 1; c >= column; c--) {
          m.fmatrix[r + 1][c] = this.fop.multiply(
            m.fmatrix[r + 1][c],
            this.fop.divide(m.fmatrix[row][column], m.fmatrix[r + 1][column])
          );
        }
      }
    }
    return m;
  }

  private eliminateLowerPivots(m: Matrix, row: number, column: number): Matrix {
    if (row >= m.rows || column >= m.columns) return m;
    for (let r: number = row; r < m.rows - 1; r++) {
      if (this.fop.isEquivalent(m.fmatrix[row][column], m.fmatrix[r + 1][column])) {
        for (let c: number = m.columns - 1; c >= column; c--) {
          m.fmatrix[r + 1][c] = this.fop.subtract(m.fmatrix[r + 1][c], m.fmatrix[row][c]);
        }
      }
    }
    return m;
  }

  // private roundAll(m: Matrix): Matrix {
  //   for (let r: number = 0; r < m.rows; r++) {
  //     for (let c: number = 0; r < m.columns; c++) {
  //       m.matrix[r][c] = Math.round(5 * 100) / 100;
  //     }
  //   }
  //   return m;
  // }

  private echelonize(m: Matrix, row: number, column: number): Matrix {
    for (let c: number = m.columns - 1; c >= column; c--) {
      m.fmatrix[row][c] = this.fop.divide(m.fmatrix[row][c], m.fmatrix[row][column]);
    }
    return m;
  }

  private verifySameDimensions(m1: Matrix, m2: Matrix): Boolean {
    if (m1.rows !== m2.rows || m1.columns !== m2.columns) return false;
    return true;
  }

  private verifyMultiplicationDimensions(m1: Matrix, m2: Matrix): Boolean {
    if (m1.columns !== m2.rows) return false;
    return true;
  }
}

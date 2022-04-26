import Matrix from "./Matrix";

export interface MatrixCalculatorInterface {
  add(m1: Matrix, m2: Matrix): Matrix | Error;

  subtract(m1: Matrix, m2: Matrix): Matrix | Error;

  multiply(m1: Matrix, m2: Matrix): Matrix | Error;

  scalar_multiply(m1: Matrix, n: number): Matrix | Error;

  transpose(m1: Matrix): Matrix | Error;

  gaussJordanElimination(m1: Matrix): Matrix;
}

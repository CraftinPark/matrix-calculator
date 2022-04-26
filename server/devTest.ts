import Matrix from "./src/Matrix";
import MatrixCalculator from "./src/MatrixCalculator";
import Fraction from "./src/Fraction";
import FractionOperator from "./src/FractionOperator";

let m1 = new Matrix(3, 4);
let m2 = new Matrix(3, 4);

m1.setFracMatrix([
  [new Fraction(1), new Fraction(2), new Fraction(3), new Fraction(4)],
  [new Fraction(5), new Fraction(6), new Fraction(7), new Fraction(8)],
  [new Fraction(9), new Fraction(10), new Fraction(11), new Fraction(12)],
]);

m2.setFracMatrix([
  [new Fraction(1), new Fraction(0), new Fraction(0), new Fraction(0)],
  [new Fraction(0), new Fraction(1), new Fraction(0), new Fraction(0)],
  [new Fraction(0), new Fraction(0), new Fraction(0), new Fraction(0)],
]);

let matrixCalculator = new MatrixCalculator();
let calculation = matrixCalculator.gaussJordanElimination(m2);

console.log(calculation);
if (!(calculation instanceof Error)) {
  for (let r = 0; r < calculation.rows; r++) {
    for (let c = 0; c < calculation.columns; c++) {
      process.stdout.write(`${calculation.fmatrix[r][c].numerator}/${calculation.fmatrix[r][c].denominator}, `);
    }
    console.log("\n");
  }
}

// let operator = new FractionOperator();
// let f1 = new Fraction(2, 3);
// let f2 = new Fraction(3, 4);
// let result = operator.add(f1, f2);

// console.log(result.numerator, result.denominator);

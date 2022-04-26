import MatrixCalculator from "./MatrixCalculator";
import { Request, Response } from "express";
import Matrix from "./Matrix";

export function addHandler(req: Request, res: Response) {
  try {
    let matrices: Matrix[] = extractMatrices(req.body.matrices);
    let matrixCalculator = new MatrixCalculator();
    let result = matrixCalculator.add(matrices[0], matrices[1]);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export function subtractHandler(req: Request, res: Response) {
  try {
    let matrices: Matrix[] = extractMatrices(req.body.matrices);
    let matrixCalculator = new MatrixCalculator();
    let result = matrixCalculator.subtract(matrices[0], matrices[1]);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export function scalarMultiplyHandler(req: Request, res: Response) {
  try {
    let matrices: Matrix[] = extractMatrices(req.body.matrices);
    let matrixCalculator = new MatrixCalculator();
    let result = matrixCalculator.scalar_multiply(matrices[0], req.body.scalar);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export function matrixMultiplyHandler(req: Request, res: Response) {
  try {
    let matrices: Matrix[] = extractMatrices(req.body.matrices);
    let matrixCalculator = new MatrixCalculator();
    let result = matrixCalculator.multiply(matrices[0], matrices[1]);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export function transposeHandler(req: Request, res: Response) {
  try {
    let matrices: Matrix[] = extractMatrices(req.body.matrices);
    let matrixCalculator = new MatrixCalculator();
    let result = matrixCalculator.transpose(matrices[0]);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

export function gaussJordanEliminationHandler(req: Request, res: Response) {
  try {
    let matrices: Matrix[] = extractMatrices(req.body.matrices);
    let matrixCalculator = new MatrixCalculator();
    console.log(matrices[0]);
    let result = matrixCalculator.gaussJordanElimination(matrices[0]);
    res.status(200).send(result);
  } catch (err) {
    res.status(400).json({ error: err });
  }
}

function extractMatrices(matrixObjects: any[]): Matrix[] {
  let matrices: Matrix[] = [];
  for (let matrix of matrixObjects) {
    let newMatrix: Matrix = new Matrix(matrix.rows, matrix.columns);
    newMatrix.setIntMatrix(matrix.matrix);
    newMatrix.fillFracMatrix();
    matrices.push(newMatrix);
  }
  return matrices;
}

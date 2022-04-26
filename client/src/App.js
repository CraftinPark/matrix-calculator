import React, { useState } from "react";
import "./App.css";
import AdditionCalculator from "./operators/AdditionCalculator";
import SubtractionCalculator from "./operators/SubtractionCalculator";
import ScalarMultiplicationCalculator from "./operators/ScalarMultiplicationCalculator";
import MatrixMultiplicationCalculator from "./operators/MatrixMultiplicationCalculator";
import TranspositionCalculator from "./operators/TranspositionCalculator";
import ResultBox from "./ResultBox";
import GaussJordanEliminationCalculator from "./operators/GaussJordanEliminationCalculator";

// TODO:
// edge cases for adding/removing dimensions - done
// operations
// abstraction and better code practice - partway
// MATRIX INPUT INTERPRETER... (handles much bigger matrices)
// negative number inputting is troublesome.
// copy result as text

// IMMEDIATE:
// matrix multiplication first matrix dimensions labels revert to 3x3
// finish button implementation for matrix multiplication - done
// abstract tools into a component - done

function App() {
  const [operator, setOperator] = useState("addition");
  const [result, setResult] = useState({
    rows: 3,
    columns: 3,
    matrix: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  });

  function renderSelectedCalculator() {
    switch (operator) {
      case "addition":
        return <AdditionCalculator setResult={setResult}></AdditionCalculator>;
      case "subtraction":
        return (
          <SubtractionCalculator setResult={setResult}></SubtractionCalculator>
        );
      case "scalar-multiplication":
        return (
          <ScalarMultiplicationCalculator
            setResult={setResult}
          ></ScalarMultiplicationCalculator>
        );
      case "matrix-multiplication":
        return (
          <MatrixMultiplicationCalculator
            setResult={setResult}
          ></MatrixMultiplicationCalculator>
        );
      case "transposition":
        return (
          <TranspositionCalculator
            setResult={setResult}
          ></TranspositionCalculator>
        );
      case "gaussjordanelimination":
        return (
          <GaussJordanEliminationCalculator
            setResult={setResult}
          ></GaussJordanEliminationCalculator>
        );
      default:
        break;
    }
  }

  return (
    <div>
      <div id="header">
        <div className="calculator-header">
          <h1 id="header-title">Matrix Calculator</h1>
          <div className="operator-selectors">
            <button
              className={
                operator === "addition"
                  ? "operator-selector-active"
                  : "operator-selector"
              }
              onClick={() => setOperator("addition")}
            >
              Addition
            </button>
            <button
              className={
                operator === "subtraction"
                  ? "operator-selector-active"
                  : "operator-selector"
              }
              onClick={() => setOperator("subtraction")}
            >
              Subtraction
            </button>
            <button
              className={
                operator === "scalar-multiplication"
                  ? "operator-selector-active"
                  : "operator-selector"
              }
              onClick={() => setOperator("scalar-multiplication")}
            >
              Scalar Multiplication
            </button>
            <button
              className={
                operator === "matrix-multiplication"
                  ? "operator-selector-active"
                  : "operator-selector"
              }
              onClick={() => setOperator("matrix-multiplication")}
            >
              Matrix Multiplication
            </button>
            <button
              className={
                operator === "transposition"
                  ? "operator-selector-active"
                  : "operator-selector"
              }
              onClick={() => setOperator("transposition")}
            >
              Transposition
            </button>
            <button
              className={
                operator === "gaussjordanelimination"
                  ? "operator-selector-active"
                  : "operator-selector"
              }
              onClick={() => setOperator("gaussjordanelimination")}
            >
              Gauss-Jordan Elimination
            </button>
          </div>
        </div>
        <div className="credit-header">
          <h2 id="credit-title">created by CraftinPark</h2>
          <a
            id="github"
            href="https://github.com/CraftinPark/matrix-calculator"
          >
            https://github.com/CraftinPark/matrix-calculator
          </a>
        </div>
      </div>

      <div id="app">
        {renderSelectedCalculator()}
        <ResultBox result={result} setResult={setResult}></ResultBox>
      </div>
    </div>
  );
}

export default App;

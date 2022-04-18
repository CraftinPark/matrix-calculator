import React, { useEffect, useState } from "react";
import "./App.css";
import AdditionCalculator from "./operators/AdditionCalculator";
import SubtractionCalculator from "./operators/SubtractionCalculator";
import ScalarMultiplicationCalculator from "./operators/ScalarMultiplicationCalculator";
import ResultBox from "./ResultBox";
import Matrix from "./operators/Matrix";

// TODO:
// edge cases for adding/removing dimensions - done
// operations
// abstraction and better code practice - partway
// MATRIX INPUT INTERPRETER...
// negative number inputting is troublesome.

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
        return <SubtractionCalculator setResult={setResult}></SubtractionCalculator>;
      case "scalar-multiplication":
        return <ScalarMultiplicationCalculator setResult={setResult}></ScalarMultiplicationCalculator>;
      case "matrix-multiplication":
        break;
      case "transposition":
        break;
    }
  }

  useEffect(() => {
    console.log(result);
  });

  return (
    <div>
      <div id="header">
        <h1>Matrix Calculator</h1>
        <div className="operator-selectors">
          <button onClick={() => setOperator("addition")}>Addition</button>
          <button onClick={() => setOperator("subtraction")}>Subtraction</button>
          <button onClick={() => setOperator("scalar-multiplication")}>Scalar Multiplication</button>
          <button onClick={() => setOperator("matrix-multiplication")}>Matrix Multiplication</button>
          <button onClick={() => setOperator("transposition")}>Transposition</button>
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

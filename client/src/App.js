import React, { useState } from "react";
import "./App.css";
import AdditionCalculator from "./operators/AdditionCalculator";

// TODO:
// edge cases for adding/removing dimensions
// operations
// abstraction and better code practice

function App() {
  const [operator, setOperator] = useState("addition");
  const [result, setResult] = useState([[0,0,0],[0,0,0],[0,0,0]]);
  

  function renderSelectedCalculator() {
    switch (operator) {
      case "addition":
        return <AdditionCalculator className="calculator"></AdditionCalculator>;
      case "subtraction":
        break;
      case "scalar-multiplication":
        break;
      case "matrix-multiplication":
        break;
    }
  }

  return (
    <div>
      <div id="header">
        <h1>Matrix Calculator</h1>
        <div className="operator-selectors">
          <button onClick={() => setOperator("addition")}>Addition</button>
          <button onClick={() => setOperator("subtraction")}>Subtraction</button>
          <button onClick={() => setOperator("scalar-multiplication")}>Scalar Multiplication</button>
          <button onClick={() => setOperator("matrix-multiplication")}>Matrix Multiplication</button>
        </div>
      </div>
      <div id="app">
        {renderSelectedCalculator()}
        <div id="result">result</div>
      </div>
    </div>
  );
}

export default App;

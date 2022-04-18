import React, { useEffect, useState } from "react";
import axios from "axios";
import Matrix from "./Matrix.js";
import { modifyMatrices, multiplicationModifier } from "./CalculatorHelpers.js";
import "./calculators.css";
import ToolBar from "./ToolBar.js";

export default function MatrixMultiplicationCalculator({ setResult }) {
  const [matrices, setMatrices] = useState([
    {
      rows: 3,
      columns: 3,
      matrix: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
    {
      rows: 3,
      columns: 3,
      matrix: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
    },
  ]);

  useEffect(() => {
    axios
      .post("http://localhost:9000/matrix-multiply", { matrices })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [matrices, setResult]);

  return (
    <div className="calculator">
      <div className="matrices">
        <Matrix matrices={matrices} matrixNumber={0} setMatrices={setMatrices}></Matrix>
        <p className="operator-symbol"></p>
        <Matrix matrices={matrices} matrixNumber={1} setMatrices={setMatrices}></Matrix>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "30px", height: "20%" }}>
        <ToolBar
          matrix={matrices[0]}
          addRow={() => modifyMatrices("rows", "add", [0], matrices, setMatrices)}
          subRow={() => modifyMatrices("rows", "sub", [0], matrices, setMatrices)}
          addColumn={() => multiplicationModifier("columns", "add", [0, 1], matrices, setMatrices)}
          subColumn={() => multiplicationModifier("columns", "sub", [0, 1], matrices, setMatrices)}
        ></ToolBar>
        <ToolBar
          matrix={matrices[1]}
          addRow={() => multiplicationModifier("rows", "add", [1, 0], matrices, setMatrices)}
          subRow={() => multiplicationModifier("rows", "sub", [1, 0], matrices, setMatrices)}
          addColumn={() => modifyMatrices("columns", "add", [1], matrices, setMatrices)}
          subColumn={() => modifyMatrices("columns", "sub", [1], matrices, setMatrices)}
        ></ToolBar>
      </div>
    </div>
  );
}

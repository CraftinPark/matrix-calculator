import React, { useEffect, useState } from "react";
import axios from "axios";
import Matrix from "./Matrix.js";
import { modifyMatrices } from "./CalculatorHelpers.js";
import ToolBar from "./ToolBar.js";
import "./calculators.css";
import "./Matrix.css";

export default function SubtractionCalculator({ setResult }) {
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
  ]);

  useEffect(() => {
    axios
      .post("http://localhost:9000/transpose", { matrices })
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
      </div>
      <ToolBar
        matrix={matrices[0]}
        addRow={() => modifyMatrices("rows", "add", [0, 1], matrices, setMatrices)}
        subRow={() => modifyMatrices("rows", "sub", [0, 1], matrices, setMatrices)}
        addColumn={() => modifyMatrices("columns", "add", [0, 1], matrices, setMatrices)}
        subColumn={() => modifyMatrices("columns", "sub", [0, 1], matrices, setMatrices)}
      ></ToolBar>
    </div>
  );
}

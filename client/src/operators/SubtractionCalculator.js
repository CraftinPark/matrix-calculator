import React, { useEffect, useState } from "react";
import axios from "axios";
import Matrix from "./Matrix.js";
import { modifyMatrices } from "./CalculatorHelpers.js";
import "./calculators.css";

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
      .post("http://localhost:9000/subtract", { matrices })
      .then((response) => {
        setResult(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [matrices]);

  return (
    <div className="calculator">
      <div className="matrices">
        <Matrix matrices={matrices} matrixNumber={0} setMatrices={setMatrices}></Matrix>
        <p className="operator-symbol">-</p>
        <Matrix matrices={matrices} matrixNumber={1} setMatrices={setMatrices}></Matrix>
      </div>
      <div className="tools">
        <div className="row-tools">
          <div className="row-label">m = {matrices[0].rows}</div>
          <button className="add-row-button" onClick={() => modifyMatrices("rows", "add", matrices, setMatrices)}>
            Add Row
          </button>
          <button className="remove-row-button" onClick={() => modifyMatrices("rows", "sub", matrices, setMatrices)}>
            Remove Row
          </button>
        </div>
        <div className="column-tools">
          <div className="column-label">n = {matrices[0].columns}</div>
          <button className="add-column-button" onClick={() => modifyMatrices("columns", "add", matrices, setMatrices)}>
            Add Column
          </button>
          <button
            className="remove-column-button"
            onClick={() => modifyMatrices("columns", "sub", matrices, setMatrices)}
          >
            Remove Column
          </button>
        </div>
      </div>
    </div>
  );
}

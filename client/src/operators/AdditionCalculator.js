import React, { useEffect, useState } from "react";
import Matrix from "./Matrix.js";
import "./calculators.css";

export default function AdditionCalculator() {
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

  const modifyMatrices = (type, mod) => {
    let newMatrices = [...matrices];
    for (let m in matrices) {
      let newMatrix = matrices[m];
      let newEntries = newMatrix.matrix;
      let newRows = newMatrix.rows;
      let newColumns = newMatrix.columns;

      if (type === "rows") {
        if (mod === "add") {
          newRows = newMatrix.rows + 1;
          newEntries.push(new Array(newEntries[0].length).fill(0));
        } else if (mod === "sub") {
          newRows = newMatrix.rows - 1;
          newEntries.pop();
        }
      } else if (type === "columns") {
        if (mod === "add") {
          newColumns = newMatrix.columns + 1;
          for (let r = 0; r < newMatrix.rows; r++) {
            newEntries[r].push(0);
          }
        } else if (mod === "sub") {
          newColumns = newMatrix.columns - 1;
          for (let r = 0; r < newMatrix.rows; r++) {
            newEntries[r].pop();
          }
        }
      }
      newMatrix = {
        ...newMatrix,
        rows: newRows,
        matrix: newEntries,
      };
      newMatrices[m] = newMatrix;
    }
    setMatrices(newMatrices);
  };

  useEffect(() => {
    console.log(matrices);
  });

  return (
    <div className="calculator">
      <Matrix matrix={matrices[0]} setMatrix={setMatrices}></Matrix>
      <p className="operator-symbol">+</p>
      <Matrix matrix={matrices[1]} setMatrix={setMatrices}></Matrix>
      <div className="tools">
        <div className="row-tools">
          <div className="row-label">m = {matrices[0].rows}</div>
          <button className="add-row-button" onClick={() => modifyMatrices("rows", "add")}>
            Add Row
          </button>
          <button className="remove-row-button" onClick={() => modifyMatrices("rows", "sub")}>
            Remove Row
          </button>
        </div>
        <div className="column-tools">
          <div className="column-label">n = {matrices[0].columns}</div>
          <button className="add-column-button" onClick={() => modifyMatrices("columns", "add")}>
            Add Column
          </button>
          <button className="remove-column-button" onClick={() => modifyMatrices("columns", "sub")}>
            Remove Column
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [matrix, setMatrix] = useState({
    rows: 3,
    columns: 3,
    matrix: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ],
  });

  const addRow = () => {
    let newMatrix = matrix.matrix;
    let newRows = matrix.rows + 1;
    newMatrix.push(new Array(matrix.matrix[0].length).fill(0));
    setMatrix((prevMatrix) => ({
      ...prevMatrix,
      rows: newRows,
      matrix: newMatrix,
    }));
  };

  const removeRow = () => {
    let newMatrix = matrix.matrix;
    let newRows = matrix.rows - 1;
    newMatrix.pop();
    setMatrix((prevMatrix) => ({
      ...prevMatrix,
      rows: newRows,
      matrix: newMatrix,
    }));
  };

  const addColumn = () => {
    let newMatrix = matrix.matrix;
    let newColumns = matrix.columns + 1;
    for (let r = 0; r < matrix.rows; r++) {
      newMatrix[r].push(0);
    }
    setMatrix((prevMatrix) => ({
      ...prevMatrix,
      columns: newColumns,
      matrix: newMatrix,
    }));
  };

  const removeColumn = () => {
    let newMatrix = matrix.matrix;
    let newColumns = matrix.columns - 1;
    for (let r = 0; r < matrix.rows; r++) {
      newMatrix[r].pop();
    }
    setMatrix((prevMatrix) => ({
      ...prevMatrix,
      columns: newColumns,
      matrix: newMatrix,
    }));
  };

  const updateEntry = (val, row, column) => {
    let newMatrix = matrix.matrix;
    newMatrix[row][column] = Number(val);
    setMatrix((prevMatrix) => ({
      ...prevMatrix,
      matrix: newMatrix,
    }));
  };

  const ensureCellContainsNumber = (val, row, column) => {
    if (isNaN(Number(val))) {
      let newMatrix = matrix.matrix;
      newMatrix[row][column] = 0;
      setMatrix((prevMatrix) => ({
        ...prevMatrix,
        matrix: newMatrix,
      }));
    }
  };

  useEffect(() => {
    console.log("matrix updated");
    console.log(matrix);
  }, [matrix]);

  return (
    <div>
      <div id="header">
        <h1>Matrix Calculator</h1>
      </div>
      <div id="app">
        <div id="calculator">
          <div className="matrix">
            {matrix.matrix.map((row, r) => {
              return (
                <div className="matrix-row" key={`cells[${r}]`}>
                  {row.map((element, c) => {
                    return (
                      <div className="matrix-cell" key={`cell[${r}][${c}]`}>
                        <input
                          className="matrix-cell-input"
                          value={matrix.matrix[r][c]}
                          onFocus={(e) => e.target.select()}
                          onChange={(e) => updateEntry(e.target.value, r, c)}
                          onBlur={(e) => ensureCellContainsNumber(e.target.value, r, c)}
                        ></input>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div>
            <button className="add-row-button" onClick={addRow}>
              Add Row
            </button>
            <button className="remove-row-button" onClick={removeRow}>
              Remove Row
            </button>
            m = {matrix.rows}
          </div>
          <div>
            <button className="add-column-button" onClick={addColumn}>
              Add Column
            </button>
            <button className="remove-column-button" onClick={removeColumn}>
              Remove Column
            </button>
            n = {matrix.columns}
          </div>
        </div>
        <div id="result">result</div>
      </div>
    </div>
  );
}

export default App;

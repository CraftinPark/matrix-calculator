import "./Matrix.css";

export default function Matrix({ matrices, matrixNumber, setMatrices, type }) {
  const updateEntry = (val, row, column) => {
    let newMatrices = [...matrices];
    let newMatrix = newMatrices[matrixNumber];
    newMatrix.matrix[row][column] = Number(val);
    newMatrices[matrixNumber] = newMatrix;
    setMatrices(newMatrices);
  };

  const ensureCellContainsNumber = (val, row, column) => {
    if (isNaN(Number(val))) {
      let newMatrices = [...matrices];
      let newMatrix = newMatrices.matrix;
      newMatrix.matrix[row][column] = 0;
      setMatrices(newMatrices);
    }
  };

  function renderMatrix() {
    let rows = [];
    let columnLengths = [];
    for (let c = 0; c < matrices[matrixNumber].matrix[0].length; c++) {
      columnLengths.push(0);
    }

    for (let r = 0; r < matrices[matrixNumber].matrix.length; r++) {
      for (let c = 0; c < matrices[matrixNumber].matrix[r].length; c++) {
        if (
          matrices[matrixNumber].matrix[r][c].toString().length - 1 >
          columnLengths[c]
        ) {
          if (matrices[matrixNumber].matrix[r][c].toString().length - 1 > 4) {
            columnLengths[c] = 5;
          } else {
            columnLengths[c] =
              matrices[matrixNumber].matrix[r][c].toString().length - 1;
          }
        }
      }
    }

    for (let r = 0; r < matrices[matrixNumber].matrix.length; r++) {
      rows.push(
        <div className="matrix-row" key={`cells[${r}]`}>
          {renderRow(r, columnLengths)}
        </div>
      );
    }
    return rows;
  }

  function renderRow(r, columnLengths) {
    let cells = [];
    for (let c = 0; c < matrices[matrixNumber].matrix[r].length; c++) {
      cells.push(
        <div
          className="matrix-cell"
          key={`cell[${r}][${c}]`}
          style={
            type === "result"
              ? { backgroundColor: "#4cd137", width: 30 + 7 * columnLengths[c] }
              : { width: 30 + 5 * columnLengths[c] }
          }
        >
          <input
            className="matrix-cell-input"
            value={
              matrices[matrixNumber].matrix[r][c].toString().length > 4
                ? matrices[matrixNumber].matrix[r][c].toPrecision(4)
                : matrices[matrixNumber].matrix[r][c]
            }
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              if (type !== "result") updateEntry(e.target.value, r, c);
            }}
            onBlur={(e) => {
              if (type !== "result")
                ensureCellContainsNumber(e.target.value, r, c);
            }}
            style={type === "result" ? { backgroundColor: "#44bd32" } : {}}
            maxLength="3"
          ></input>
        </div>
      );
    }
    return cells;
  }

  return (
    <div
      className="matrix"
      style={type === "result" ? { borderColor: "#4cd137" } : {}}
    >
      {renderMatrix()}
    </div>
  );
}

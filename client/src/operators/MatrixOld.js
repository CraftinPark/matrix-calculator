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

  return (
    <div
      className="matrix"
      style={type === "result" ? { borderColor: "#4cd137" } : {}}
    >
      {matrices[matrixNumber].matrix.map((row, r) => {
        return (
          <div className="matrix-row" key={`cells[${r}]`}>
            {row.map((column, c) => {
              return (
                <div
                  className="matrix-cell"
                  key={`cell[${r}][${c}]`}
                  style={
                    type === "result" ? { backgroundColor: "#4cd137" } : {}
                  }
                >
                  <input
                    className="matrix-cell-input"
                    value={matrices[matrixNumber].matrix[r][c]}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      if (type !== "result") updateEntry(e.target.value, r, c);
                    }}
                    onBlur={(e) => {
                      if (type !== "result")
                        ensureCellContainsNumber(e.target.value, r, c);
                    }}
                    style={
                      type === "result" ? { backgroundColor: "#44bd32" } : {}
                    }
                    maxLength="3"
                  ></input>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

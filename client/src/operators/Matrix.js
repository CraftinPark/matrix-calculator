import "./Matrix.css";

export default function Matrix(props) {
  const updateEntry = (val, row, column) => {
    let newMatrices = [...props.matrices];
    let newMatrix = newMatrices[props.matrixNumber];
    newMatrix.matrix[row][column] = Number(val);
    newMatrices[props.matrixNumber] = newMatrix;
    props.setMatrices(newMatrices);
  };

  const ensureCellContainsNumber = (val, row, column) => {
    if (isNaN(Number(val))) {
      let newMatrices = [...props.matrices];
      let newMatrix = newMatrices.matrix;
      newMatrix.matrix[row][column] = 0;
      props.setMatrix(newMatrices);
    }
  };

  return (
    <div className="matrix">
      {props.matrices[props.matrixNumber].matrix.map((row, r) => {
        return (
          <div className="matrix-row" key={`cells[${r}]`}>
            {row.map((element, c) => {
              return (
                <div className="matrix-cell" key={`cell[${r}][${c}]`}>
                  <input
                    className="matrix-cell-input"
                    value={props.matrices[props.matrixNumber].matrix[r][c]}
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
  );
}

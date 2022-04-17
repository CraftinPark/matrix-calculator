import "./Matrix.css";

export default function Matrix(props) {
  const updateEntry = (val, row, column) => {
    let newMatrix = props.matrix.matrix;
    newMatrix[row][column] = Number(val);
    props.setMatrix((prevMatrix) => ({
      ...prevMatrix,
      matrix: newMatrix,
    }));
  };

  const ensureCellContainsNumber = (val, row, column) => {
    if (isNaN(Number(val))) {
      let newMatrix = props.matrix.matrix;
      newMatrix[row][column] = 0;
      props.setMatrix((prevMatrix) => ({
        ...prevMatrix,
        matrix: newMatrix,
      }));
    }
  };

  return (
    <div className="matrix">
      {props.matrix.matrix.map((row, r) => {
        return (
          <div className="matrix-row" key={`cells[${r}]`}>
            {row.map((element, c) => {
              return (
                <div className="matrix-cell" key={`cell[${r}][${c}]`}>
                  <input
                    className="matrix-cell-input"
                    value={props.matrix.matrix[r][c]}
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

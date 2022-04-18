export const modifyMatrices = (type, mod, matrices, setMatrices) => {
    let newMatrices = [...matrices];
    for (let m in matrices) {
      let newMatrix = matrices[m];
      let newEntries = newMatrix.matrix;
      let newRows = newMatrix.rows;
      let newColumns = newMatrix.columns;

      if (type === "rows") {
        if (mod === "add" && newMatrix.rows < 10) {
          newRows = newMatrix.rows + 1;
          newEntries.push(new Array(newEntries[0].length).fill(0));
        } else if (mod === "sub" && newMatrix.rows > 1) {
          newRows = newMatrix.rows - 1;
          newEntries.pop();
        }
      } else if (type === "columns") {
        if (mod === "add" && newMatrix.columns < 10) {
          newColumns = newMatrix.columns + 1;
          for (let r = 0; r < newMatrix.rows; r++) {
            newEntries[r].push(0);
          }
        } else if (mod === "sub" && newMatrix.columns > 1) {
          newColumns = newMatrix.columns - 1;
          for (let r = 0; r < newMatrix.rows; r++) {
            newEntries[r].pop();
          }
        }
      }
      newMatrix = {
        ...newMatrix,
        rows: newRows,
        columns: newColumns,
        matrix: newEntries,
      };
      newMatrices[m] = newMatrix;
    }
    setMatrices(newMatrices);
  };
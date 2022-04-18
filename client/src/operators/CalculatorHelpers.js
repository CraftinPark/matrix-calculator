export const modifyMatrices = (type, mod, indices, matrices, setMatrices) => {
  let newMatrices = matrices.map((m, i) => {
    let newMatrix = { ...m };
    if (indices.includes(i)) {
      if (type === "rows" && mod === "add" && newMatrix.rows < 10) {
        newMatrix.rows++;
        newMatrix.matrix.push(new Array(newMatrix.columns).fill(0));
      } else if (type === "rows" && mod === "sub" && newMatrix.rows > 1) {
        newMatrix.rows--;
        newMatrix.matrix.pop();
      } else if (type === "columns" && mod === "add" && newMatrix.columns < 10) {
        newMatrix.columns++;
        for (let r = 0; r < newMatrix.rows; r++) newMatrix.matrix[r].push(0);
      } else if (type === "columns" && mod === "sub" && newMatrix.columns > 1) {
        newMatrix.columns--;
        for (let r = 0; r < newMatrix.rows; r++) newMatrix.matrix[r].pop();
      }
    }
    return newMatrix;
  });
  setMatrices(newMatrices);
};

export const multiplicationModifier = (type, mod, indices, matrices, setMatrices) => {
  let newMatrices = [...matrices];
  let newMatrix1 = matrices[indices[0]];
  let newMatrix2 = matrices[indices[1]];
  let newEntries1 = newMatrix1.matrix;
  let newEntries2 = newMatrix2.matrix;
  let newRows1 = newMatrix1.rows;
  let newColumns1 = newMatrix1.columns;
  let newRows2 = newMatrix2.rows;
  let newColumns2 = newMatrix2.columns;
  if (type === "rows") {
    if (mod === "add" && newMatrix1.rows < 10 && newMatrix2.columns < 10) {
      newRows1 = newMatrix1.rows + 1;
      newColumns2 = newMatrix2.columns + 1;
      newEntries1.push(new Array(newEntries1[0].length).fill(0));
      for (let r = 0; r < newMatrix2.rows; r++) {
        newEntries2[r].push(0);
      }
    } else if (mod === "sub" && newMatrix1.rows > 1 && newMatrix2.columns > 1) {
      newRows1 = newMatrix1.rows - 1;
      newColumns2 = newMatrix2.columns - 1;
      newEntries1.pop();
      for (let r = 0; r < newMatrix2.rows; r++) {
        newEntries2[r].pop();
      }
    }
  } else if (type === "columns") {
    if (mod === "add" && newMatrix1.columns < 10 && newMatrix2.rows < 10) {
      newColumns1 = newMatrix1.columns + 1;
      newRows2 = newMatrix2.rows + 1;
      for (let r = 0; r < newMatrix1.rows; r++) {
        newEntries1[r].push(0);
      }
      newEntries2.push(new Array(newEntries2[0].length).fill(0));
    } else if (mod === "sub" && newMatrix1.columns > 1 && newMatrix2.rows > 1) {
      newColumns1 = newMatrix1.columns - 1;
      newRows2 = newMatrix2.rows - 1;
      for (let r = 0; r < newMatrix1.rows; r++) {
        newEntries1[r].pop();
      }
      newEntries2.pop();
    }
  }
  newMatrix1 = {
    rows: newRows1,
    columns: newColumns1,
    matrix: newEntries1,
  };
  newMatrix2 = {
    rows: newRows2,
    columns: newColumns2,
    matrix: newEntries2,
  };
  newMatrices[indices[0]] = newMatrix1;
  newMatrices[indices[1]] = newMatrix2;
  setMatrices(newMatrices);
};

export default function ToolBar({ matrix, addRow, subRow, addColumn, subColumn }) {
  return (
    <div className="tools">
      <div className="row-tools">
        <div className="row-label">m = {matrix.rows}</div>
        <button className="add-row-button" onClick={addRow}>
          Add Row
        </button>
        <button className="remove-row-button" onClick={subRow}>
          Remove Row
        </button>
      </div>
      <div className="column-tools">
        <div className="column-label">n = {matrix.columns}</div>
        <button className="add-column-button" onClick={addColumn}>
          Add Column
        </button>
        <button className="remove-column-button" onClick={subColumn}>
          Remove Column
        </button>
      </div>
    </div>
  );
}

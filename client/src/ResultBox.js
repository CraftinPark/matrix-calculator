import React, { useEffect, useState } from "react";
import Matrix from "./operators/Matrix.js";
import "./ResultBox.css";

export default function ResultBox(props) {
  return (
    <div className="result-box">
      <Matrix matrices={[props.result]} matrixNumber={0} setMatrices={props.setResult}></Matrix>
    </div>
  );
}

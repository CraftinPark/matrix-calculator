import express from "express";
import cors from "cors";
import path from "path";
import {
  addHandler,
  subtractHandler,
  scalarMultiplyHandler,
  matrixMultiplyHandler,
  transposeHandler,
  gaussJordanEliminationHandler,
} from "./routers";

const app = express();
const PORT = 9000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.get("/", (req, res) => {
  res.send(path.join(__dirname, "build", "index.html"));
});

app.post("/add", addHandler);
app.post("/subtract", subtractHandler);
app.post("/scalar-multiply", scalarMultiplyHandler);
app.post("/matrix-multiply", matrixMultiplyHandler);
app.post("/transpose", transposeHandler);
app.post("/gaussjordanelimination", gaussJordanEliminationHandler);

app.listen(PORT, () => {
  console.log("app running on port " + PORT);
});

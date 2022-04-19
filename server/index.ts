import express, { Application, Request, Response } from "express";
import * as http from "http";
import cors from "cors";
import Matrix from "./Matrix";
import MatrixCalculator from "./MatrixCalculator";

export default class Server {
  private readonly PORT;
  private app;
  private server: http.Server | undefined;

  constructor(port: number) {
    this.PORT = port;
    this.app = express();

    this.registerMiddleware();
    this.registerRoutes();
  }
  public start(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.server !== undefined) {
        reject();
      } else {
        this.server = this.app
          .listen(this.PORT, () => {
            resolve();
          })
          .on("error", (err: Error) => {
            // catches errors in server start
            console.error(`Server::start() - server ERROR: ${err.message}`);
            reject(err);
          });
      }
    });
  }

  private registerMiddleware() {
    this.app.use(express.json());
    this.app.use(express.raw({ type: "application/*", limit: "10mb" }));

    this.app.use(cors());
    console.log("cors initialized for cross-origin sharing");
  }

  private registerRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("./../client/public/index.html");
    });
    this.app.post("/add", this.addHandler);
    this.app.post("/subtract", this.subtractHandler);
    this.app.post("/scalar-multiply", this.scalarMultiplyHandler);
    this.app.post("/matrix-multiply", this.matrixMultiplyHandler);
    this.app.post("/transpose", this.transposeHandler);
  }

  private addHandler(req: Request, res: Response) {
    try {
      let matrixCalculator = new MatrixCalculator();
      let result = matrixCalculator.add(req.body.matrices[0], req.body.matrices[1]);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  private subtractHandler(req: Request, res: Response) {
    try {
      let matrixCalculator = new MatrixCalculator();
      let result = matrixCalculator.subtract(req.body.matrices[0], req.body.matrices[1]);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  private scalarMultiplyHandler(req: Request, res: Response) {
    try {
      let matrixCalculator = new MatrixCalculator();
      let result = matrixCalculator.scalar_multiply(req.body.matrices[0], req.body.scalar);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  private matrixMultiplyHandler(req: Request, res: Response) {
    try {
      let matrixCalculator = new MatrixCalculator();
      let result = matrixCalculator.multiply(req.body.matrices[0], req.body.matrices[1]);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }

  private transposeHandler(req: Request, res: Response) {
    try {
      let matrixCalculator = new MatrixCalculator();
      let result = matrixCalculator.transpose(req.body.matrices[0]);
      res.status(200).send(result);
    } catch (err) {
      res.status(400).json({ error: err });
    }
  }
}

import express, { Express } from "express";
import healthCheck from "../routes/healthCheck";
import cors from "cors";
import morgan from "morgan";
import swaggerDocs from "../utils/swagger";

export default function (app: Express, port: number) {
    app.use(express.json());
    // Register TSOA routes

    // Serve Swagger UI at /docs
    // const swaggerDocument = require("../swagger.json");

    // Error handler for TSOA validation errors
    app.use(morgan("tiny"));
    app.use(cors());
    app.use("/healthcheck", healthCheck);
    swaggerDocs(app, port);
    // app.use("/api/todos", todos);
}

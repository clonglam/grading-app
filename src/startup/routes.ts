import express, { Express } from "express";
import healthCheck from "../routes/healthCheck";
import cors from "cors";
import morgan from "morgan";
import swaggerDocs from "../utils/swagger";
import users from "../routes/users";

export default function (app: Express, port: number) {
    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(cors());
    app.use("/api/healthcheck", healthCheck);
    app.use("/api/users", users);

    swaggerDocs(app, port);
}

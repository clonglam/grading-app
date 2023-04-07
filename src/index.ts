import express from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();

import routers from "./startup/routes";
import swaggerDocs from "./utils/swagger";

const port = Number(process.env.PORT) || 6000;
const app = express();

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
  routers(app, port);

  // swaggerDocs(app, port);
});

export default app;

import express, { Express, Request, Response } from "express"

import dotenv from "dotenv";
dotenv.config();

import * as database from "./config/database"
database.connect()

const app: Express = express();
const port: number | string= process.env.PORT || 3000;

app.use(express.static("public"))

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

import clientRoutes from "./routes/client/index.route";
clientRoutes(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
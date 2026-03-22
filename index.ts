import express, { Express } from "express"
import path from "path"
import dotenv from "dotenv";
dotenv.config();

import * as database from "./config/database"
database.connect()

const app: Express = express();
const port: number | string= process.env.PORT || 3000;

app.use(express.static("public"))

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

import { systemConfig } from "./config/config";
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname,'node_modules','tinymce')))
// End Tiny MCE


import clientRoutes from "./routes/client/index.route";
clientRoutes(app)

import adminRoutes from "./routes/admin/index.route";
adminRoutes(app)


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
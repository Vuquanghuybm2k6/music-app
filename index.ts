import express, { Express } from "express"
import path from "path"
import dotenv from "dotenv";
dotenv.config();

import * as database from "./config/database"
database.connect()

const app: Express = express();

app.use(express.static(`${__dirname}/public`))

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

import { systemConfig } from "./config/config";
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname,'node_modules','tinymce')))
// End Tiny MCE

import cookieParser from 'cookie-parser'

var methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(cookieParser())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended : false}))

import clientRoutes from "./routes/client/index.route";
clientRoutes(app)

import adminRoutes from "./routes/admin/index.route";
adminRoutes(app)

module.exports = app

if (require.main === module) {
  const port: number | string = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}
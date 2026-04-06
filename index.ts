import express, { Express } from "express"
import path from "path"
import dotenv from "dotenv";
dotenv.config();

import * as database from "./config/database"
database.connect()

const app: Express = express();

// Flash
import session from "express-session"
import cookieParser from 'cookie-parser'
import flash from "express-flash"
app.use(cookieParser('keyboard cat')) // lưu vào trong cookie
app.use(session({
  secret: 'keyboard cat', // ❗ bắt buộc phải có
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}))
app.use(flash())
// End Flash

app.use(express.static(`${__dirname}/public`))

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

import { systemConfig } from "./config/system";
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Tiny MCE
app.use('/tinymce', express.static(path.join(__dirname,'node_modules','tinymce')))
// End Tiny MCE



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
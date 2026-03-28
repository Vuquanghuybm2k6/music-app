import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/client/user.controller"
const multer = require("multer")
const upload = multer()
const uploadCloud = require("../../middlewares/client/uploadCloud")
router.get("/register", controller.register)
router.post(
  "/register",
  upload.single("avatar"),
  uploadCloud.upload,
  controller.registerPost)
router.get("/login", controller.login)
router.post("/login", controller.loginPost)

export const userRoutes: Router = router 
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
router.get("/logout", controller.logout)
router.get("/password/forgot", controller.forgotPassword)
router.post("/password/forgot", controller.forgotPasswordPost)
router.get("/password/otp", controller.otpPassword)
router.post("/password/otp", controller.otpPasswordPost)

export const userRoutes: Router = router 
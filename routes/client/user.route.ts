import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/client/user.controller"
const multer = require("multer")
const upload = multer()
const uploadCloud = require("../../middlewares/client/uploadCloud")
import {requireAuth} from "../../middlewares/client/requireAuth"

router.get("/register", controller.register)
router.post(
  "/register",
  upload.single("avatar"),
  uploadCloud.upload,
  requireAuth,
  controller.registerPost)
router.get("/login", controller.login)
router.post("/login", controller.loginPost)
router.get("/logout", controller.logout)
router.get("/password/forgot", controller.forgotPassword)
router.post("/password/forgot", controller.forgotPasswordPost)
router.get("/password/otp", controller.otpPassword)
router.post("/password/otp", controller.otpPasswordPost)
router.get("/password/reset", controller.resetPassword)
router.post("/password/reset", controller.resetPasswordPost)
export const userRoutes: Router = router 
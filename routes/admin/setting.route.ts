import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/setting.controller"
import * as uploadCloud from '../../middlewares/admin/uploadCloud'
import multer from "multer"
const upload = multer()
router.get("/general", controller.general)
router.patch(
  "/general", 
  upload.fields([{name: "logo", maxCount: 1}]),
  uploadCloud.uploadFields,
  controller.generalPost)
export const settingRoutes: Router = router
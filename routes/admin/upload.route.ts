import { Router } from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/upload.controller"
import multer from "multer"
const upload = multer()
import * as uploadCloud from '../../middlewares/admin/uploadCloud'

router.post(
  "/",
  upload.single("file"),
  uploadCloud.uploadSingle,
  controller.index
)

export const uploadRoutes: Router = router 
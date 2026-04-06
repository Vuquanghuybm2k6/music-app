import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/my-account.controller"
import * as uploadCloud from '../../middlewares/admin/uploadCloud'
import multer from "multer"
const upload = multer()
router.get("/", controller.index)
router.get("/edit", controller.edit)
router.patch(
  "/edit", 
  upload.fields([{ name: 'avatar', maxCount: 1 },]),
  uploadCloud.uploadFields,
  controller.editPatch
)

export const myAccountRoutes: Router = router 
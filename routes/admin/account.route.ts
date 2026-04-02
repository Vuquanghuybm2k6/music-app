import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/account.controller"
import * as uploadCloud from '../../middlewares/admin/uploadCloud'
import multer from "multer"
const upload = multer()
router.get("/", controller.index)
router.get("/create", controller.create)
router.post(
  "/create",
  upload.fields([
    { name: 'avatar', maxCount: 1 }
    ]),
  uploadCloud.uploadFields,
  controller.createPost)
router.get("/edit/:id", controller.edit)
router.patch(
  "/edit/:id", 
  upload.fields([{ name: 'avatar', maxCount: 1 }]),
  uploadCloud.uploadFields,
  controller.editPatch)
router.patch("/delete/:id", controller.deleteAccount)
router.get("/detail/:id", controller.detail)
router.patch("/change-status/:status/:id", controller.changeStatus)
export const accountRoutes: Router = router 
import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/singer.controller"
import * as uploadCloud from '../../middlewares/admin/uploadCloud'
import * as validate from '../../validates/admin/singer.validate'
import multer from "multer"
const upload = multer()
router.get("/", controller.index)
router.patch("/delete/:id", controller.deleteSinger)

router.get("/create", controller.create)
router.post(
  "/create",
  upload.single("avatar"),
  validate.createPost,
  uploadCloud.uploadSingle,
  controller.createPost
)
router.get("/detail/:id", controller.detail)
router.get("/edit/:id", controller.edit)
router.patch(
  "/edit/:id",
  upload.single("avatar"),
  validate.editPatch,
  uploadCloud.uploadSingle,
  controller.editPatch
)
router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)

export const singerRoutes: Router = router 
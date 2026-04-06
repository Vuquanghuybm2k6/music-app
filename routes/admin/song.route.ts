import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/song.controller"
import * as uploadCloud from '../../middlewares/admin/uploadCloud'
import * as validate from '../../validates/admin/song.validate'
import multer from "multer"
const upload = multer()
router.get("/", controller.index)

router.get("/create", controller.create)

router.post(
  "/create",
  upload.fields([
    { name: 'avatar', maxCount: 1 },
     { name: 'audio', maxCount: 1 }
    ]),
  validate.createPost,
  uploadCloud.uploadFields,
  controller.createPost
)

router.get("/edit/:id", controller.edit)

router.patch(
  "/edit/:id",
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'audio', maxCount: 1 }
    ]),
  validate.editPatch,
  uploadCloud.uploadFields,
  controller.editPatch
  )
router.patch(
  "/delete/:id",
  controller.deleteSong
  )
router.get("/detail/:id", controller.detail)
router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)
export const songRoutes: Router = router 
import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/song.controller"
import * as uploadCloud from '../../middlewares/admin/uploadCloud'
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
  uploadCloud.uploadFields,
  controller.editPatch
  )
router.patch(
  "/delete/:id",
  controller.deleteSong
  )
router.get("/detail/:id", controller.detail)
export const songRoutes: Router = router 
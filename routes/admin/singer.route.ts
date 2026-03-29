import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/singer.controller"
import * as uploadCloud from '../../middlewares/admin/uploadCloud'
import multer from "multer"
const upload = multer()
router.get("/", controller.index)
router.patch("/delete/:id", controller.deleteSinger)

router.get("/create", controller.create)
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
)
router.get("/detail/:id", controller.detail)

export const singerRoutes: Router = router 
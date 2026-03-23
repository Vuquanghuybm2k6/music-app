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
  upload.single("avatar"),
  uploadCloud.upload,
  controller.createPost
)

export const songRoutes: Router = router 
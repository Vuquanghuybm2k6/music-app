import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/topic.controller"
import multer from "multer"
const upload = multer()
import * as uploadCloud from '../../middlewares/admin/uploadCloud'
router.get("/", controller.index)

router.patch("/delete/:idTopic", controller.deleteTopic)
router.get("/create", controller.create)
router.post(
  "/create", 
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.createPost
)
router.get("/detail/:id", controller.detail)
router.get("/edit/:id", controller.edit)
router.patch(
  "/edit/:id", 
  upload.single("avatar"),
  uploadCloud.uploadSingle,
  controller.editPatch
)
router.patch("/change-status/:status/:id", controller.changeStatus)
router.patch("/change-multi", controller.changeMulti)

export const topicRoutes: Router = router 
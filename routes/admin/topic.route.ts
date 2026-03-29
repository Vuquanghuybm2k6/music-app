import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/topic.controller"

router.get("/", controller.index)

router.patch("/delete/:idTopic", controller.deleteTopic)
router.get("/create", controller.create)

export const topicRoutes: Router = router 
import {Router, Request, Response} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/client/topic.controlles"
router.get("/", controller.index);

export const topicRoutes: Router = router 
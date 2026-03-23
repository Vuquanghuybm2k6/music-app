import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/client/page.controller"

router.get("/", controller.index)

export const pageRoutes: Router = router 
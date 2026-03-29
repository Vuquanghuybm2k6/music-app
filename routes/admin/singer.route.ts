import {Router} from 'express'
const router: Router = Router()
import * as controller from "../../controllers/admin/singer.controller"
router.get("/", controller.index)
router.patch("/delete/:id", controller.deleteSinger)


export const singerRoutes: Router = router 
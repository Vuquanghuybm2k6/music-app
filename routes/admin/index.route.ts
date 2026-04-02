import {Express} from "express"

import {dashboardRoutes} from "./dashboard.route"
import { systemConfig } from "../../config/system"
import { topicRoutes } from "./topic.route"
import { songRoutes } from "./song.route"
import { uploadRoutes } from "./upload.route"
import { singerRoutes } from "./singer.route"
import { roleRoutes } from "./role.route"
import { accountRoutes } from "./account.route"
import { userRoutes } from "./users.route"
import { settingRoutes } from "./setting.route"
import { authRoutes } from "./auth.route"
import { requireAuth } from "../../middlewares/admin/requireAuth.middleware"
const adminRoutes = (app: Express):void =>{
  const PATH_ADMIN =   `${systemConfig.prefixAdmin}`
  app.use(`${PATH_ADMIN}/dashboard`, requireAuth, dashboardRoutes)
  app.use(`${PATH_ADMIN}/topics`, requireAuth, topicRoutes)
  app.use(`${PATH_ADMIN}/songs`, requireAuth, songRoutes)
  app.use(`${PATH_ADMIN}/upload`, requireAuth, uploadRoutes)
  app.use(`${PATH_ADMIN}/singers`, requireAuth, singerRoutes)
  app.use(`${PATH_ADMIN}/roles`, requireAuth, roleRoutes)
  app.use(`${PATH_ADMIN}/accounts`, requireAuth, accountRoutes)
  app.use(`${PATH_ADMIN}/users`, requireAuth, userRoutes)
  app.use(`${PATH_ADMIN}/settings`, requireAuth, settingRoutes)
  app.use(`${PATH_ADMIN}/auth`, authRoutes)

}
export default adminRoutes
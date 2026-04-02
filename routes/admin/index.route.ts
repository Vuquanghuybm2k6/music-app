import {Express} from "express"

import {dashboardRoutes} from "./dashboard.route"
import { systemConfig } from "../../config/config"
import { topicRoutes } from "./topic.route"
import { songRoutes } from "./song.route"
import { uploadRoutes } from "./upload.route"
import { singerRoutes } from "./singer.route"
import { roleRoutes } from "./role.route"
import { accountRoutes } from "./account.route"
import { userRoutes } from "./users.route"
import { settingRoutes } from "./setting.route"
const adminRoutes = (app: Express):void =>{
  const PATH_ADMIN =   `${systemConfig.prefixAdmin}`
  app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes)
  app.use(`${PATH_ADMIN}/topics`, topicRoutes)
  app.use(`${PATH_ADMIN}/songs`, songRoutes)
  app.use(`${PATH_ADMIN}/upload`, uploadRoutes)
  app.use(`${PATH_ADMIN}/singers`, singerRoutes)
  app.use(`${PATH_ADMIN}/roles`, roleRoutes)
  app.use(`${PATH_ADMIN}/accounts`, accountRoutes)
  app.use(`${PATH_ADMIN}/users`, userRoutes)
  app.use(`${PATH_ADMIN}/settings`, settingRoutes)

}
export default adminRoutes
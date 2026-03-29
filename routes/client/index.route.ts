import {Express} from "express"

import {topicRoutes} from "./topic.route"
import { songRoutes } from "./song.route"
import { favoriteSongRoutes } from "./favorite-song.route"
import { searchRoutes } from "./search.route"
import { homeRoutes } from "./page.route"
import { userRoutes } from "./user.route"
import {requireAuth} from "../../middlewares/client/requireAuth"
const clientRoutes = (app: Express):void =>{
  app.use("/topics", requireAuth, topicRoutes)
  app.use("/songs", requireAuth, songRoutes)
  app.use("/favorite-songs", requireAuth, favoriteSongRoutes)
  app.use("/search", requireAuth, searchRoutes)
  app.use("/", homeRoutes)
  app.use("/user", userRoutes)
}
export default clientRoutes
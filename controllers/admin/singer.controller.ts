import { Request, Response } from "express"
import Song from "../../models/song.model"
import Topic from "../../models/topic.model"
import Singer from "../../models/singer.model"
import { systemConfig } from "../../config/config"

// [GET]: /admin/singers
export const index = async (req: Request, res: Response) => {
  const singers = await Singer.find({
    deleted: false
  })
  res.render("admin/pages/singers/index",{
    pageTitle: "Danh sách ca sĩ",
    singers
  })
}
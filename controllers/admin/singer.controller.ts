import { Request, Response } from "express"
import Song from "../../models/song.model"
import Topic from "../../models/topic.model"
import Singer from "../../models/singer.model"
import { systemConfig } from "../../config/config"
import { idText } from "typescript"

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

// [PATCH]: /admin/singers/delete/:id
export const deleteSinger = async (req: Request, res: Response) => {
  const id = req.params.id
  const singer = await Singer.findOne({
    _id: id,
    deleted: false
  })
  if(!singer){
    console.log("Không tìm thấy ca sĩ")
  } else {    
    await Singer.updateOne({
      _id: id
    }, {
      deleted: true
    })
    console.log("Xóa ca sĩ thành công")
  }
  res.redirect("/admin/singers")
}
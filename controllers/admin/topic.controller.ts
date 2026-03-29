import { Request, Response } from "express"
import Topic from "../../models/topic.model"

// [GET]: /admin/topics
export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  })
  res.render("admin/pages/topics/index",{
    pageTitle: "Quản lí chủ đề",
    topics
  })
}

// [PATCH]: /admin/topics/delete
export const deleteTopic = async (req: Request, res: Response) => {
  const idTopic = req.params.idTopic
  const topic = await Topic.findOne({
    _id: idTopic,
    deleted: false
  })  
  if(!topic) {
    console.log("Không tìm thấy chủ đề")
    return res.redirect("/admin/topics")
  }
  else{
    await Topic.updateOne({
      _id: idTopic
    },{
      deleted: true
    })
    console.log("Xóa chủ đề thành công")
    return res.redirect("/admin/topics")
  }
}

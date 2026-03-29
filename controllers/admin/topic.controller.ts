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

// [GET]: /admin/topics/create
export const create = async (req: Request, res: Response) => {
  
  res.render("admin/pages/topics/create",{
    pageTitle: "Tạo mới chủ đề",
  })
}

// [POST]: /admin/topics/create
export const createPost = async (req: Request, res: Response) => {
  const topic = new Topic(req.body)
  await topic.save()
  console.log("Tạo chủ đề thành công")
  return res.redirect("/admin/topics")
}

// [GET]: /admin/topics/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id
  const topic = await Topic.findOne({
    _id: id,
    deleted: false
  })
  res.render("admin/pages/topics/detail",{
    pageTitle: "Chi tiết chủ đề",
    topic
  })
  
}

// [GET]: /admin/topics/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id
  const topic = await Topic.findOne({
    _id: id,
    deleted: false
  })
  res.render("admin/pages/topics/edit",{
    pageTitle: "Chỉnh sửa chủ đề",
    topic
  })
}

// [PATCH]: /admin/topics/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id
  await Topic.updateOne({
    _id: id
  }, {
    ...req.body
  })
  console.log("Cập nhật chủ đề thành công")
  return res.redirect("/admin/topics")
}
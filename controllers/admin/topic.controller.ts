import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import paginationHelper from "../../helpers/pagination"

// [GET]: /admin/topics
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false
  }
  const pagination = {
    limitItem: 4,
    currentPage: 1, 
    skip: 1
  }
  const totalItems = await Topic.countDocuments(find)
  paginationHelper(req.query, totalItems, pagination)
  const topics = await Topic.find(find).skip(pagination.skip).limit(pagination.limitItem)
  res.render("admin/pages/topics/index",{
    pageTitle: "Quản lí chủ đề",
    topics,
    pagination: pagination
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

// [PATCH]: /admin/topics/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id = req.params.id
  const status = req.params.status
  const topic = await Topic.findOne({
    _id: id,
    deleted: false
  })
  if(!topic){
    console.log("Không tìm thấy chủ đề")
  }
  else{
    await Topic.updateOne({
      _id: id
    },{
      status: status
    })
    console.log("Cập nhật trạng thái chủ đề thành công")
  }
  res.redirect("/admin/topics")
}

// [PATCH]: /admin/topics/change-multi
export const changeMulti = async (req: Request, res: Response) => {
  const ids = req.body.ids.split(", ")
  const type = req.body.type
  switch(type){
    case "active":
      await Topic.updateMany({
        _id: {$in: ids}
      },{
        $set: {status: "active"}
      })
      break
    case "inactive":
      await Topic.updateMany({
        _id: {$in:ids}
      },{
        $set: {status: "inactive"}
      })
      break
    case "delete-all":
      await Topic.updateMany({
        _id: {$in: ids}
      },{
        $set:{deleted:true}
      })
     break
     default:
      break
  }
  console.log("Thay đổi thành công")
  res.redirect(req.get("Referer"))
}
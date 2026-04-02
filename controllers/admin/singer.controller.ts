import { Request, Response } from "express"
import Singer from "../../models/singer.model"
import paginationHelper from "../../helpers/pagination"
import searchHelper from "../../helpers/search"
// [GET]: /admin/singers
export const index = async (req: Request, res: Response) => {
  const find : {
      deleted: boolean,
      fullName?: RegExp
    } = {
      deleted: false,
    }
    if(req.query.keyword){
      const regex = searchHelper(req.query) 
      find.fullName = regex
    }
  const pagination = {
    limitItem: 4,
    currentPage: 1, 
    skip: 1
  }
  const totalItems = await Singer.countDocuments(find)
  paginationHelper(req.query, totalItems, pagination)
  const singers = await Singer.find(find).skip(pagination.skip).limit(pagination.limitItem)
  res.render("admin/pages/singers/index",{
    pageTitle: "Danh sách ca sĩ",
    singers,
    pagination
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

// [GET]: /admin/singers/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/singers/create",{
    pageTitle: "Tạo mới ca sĩ"
  })
}

// [POST]: /admin/singers/create
export const createPost = async (req: Request, res: Response) => {
  const singer = new Singer(req.body)
  await singer.save()
  console.log("Tạo ca sĩ thành công")
  return res.redirect("/admin/singers")
}

// [GET]: /admin/singers/detail/:id
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id
  const singer = await Singer.findOne({
    _id: id,
    deleted: false
  })
  res.render("admin/pages/singers/detail",{
    pageTitle: "Chi tiết ca sĩ",
    singer
  })
}

// [GET]: /admin/singers/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id
  const singer = await Singer.findOne({
    _id: id,
    deleted: false
  })
  res.render("admin/pages/singers/edit",{
    pageTitle: "Chỉnh sửa ca sĩ",
    singer
  })
}

// [PATCH]: /admin/singers/edit/:id
export const editPatch = async (req: Request, res: Response) => {
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
    }, req.body)
    console.log("Cập nhật ca sĩ thành công")
  }
  res.redirect("/admin/singers")
}

// [PATCH]: /admin/singers/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id = req.params.id
  const status = req.params.status 
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
      status: status
    })
    console.log("Cập nhật trạng thái ca sĩ thành công")
  } 
  res.redirect("/admin/singers")
}

// [PATCH]: /admin/singers/change-multi
export const changeMulti = async (req: Request, res: Response) => {
  const ids = req.body.ids.split(", ")
  const type = req.body.type
  switch(type){
    case "active":
      await Singer.updateMany({
        _id: {$in: ids}
      },{
        $set: {status: "active"}
      })
      break
    case "inactive":
      await Singer.updateMany({
        _id: {$in:ids}
      },{
        $set: {status: "inactive"}
      })
      break
    case "delete-all":
      await Singer.updateMany({
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
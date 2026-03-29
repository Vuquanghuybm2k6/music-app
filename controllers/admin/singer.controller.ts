import { Request, Response } from "express"
import Singer from "../../models/singer.model"

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
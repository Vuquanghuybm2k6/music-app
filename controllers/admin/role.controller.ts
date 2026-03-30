import { Request, Response } from "express"
import Role from "../../models/role.model"

// [GET]: /admin/roles
export const index = async (req: Request, res: Response) => {
  const role = await Role.find({
    deleted: false
  })
  res.render("admin/pages/roles/index",{
    pageTitle: "Nhóm quyền",
    records: role
  })
}

// [GET]: /admin/roles/create
export const create = async (req: Request, res: Response) => {
  res.render("admin/pages/roles/create",{
    pageTitle: "Thêm mới Nhóm quyền",
  })
}

// [POST]: /admin/roles/create
export const createPost = async (req: Request, res: Response) => {
  try{
    const role = new Role(req.body)
    await role.save()
    console.log("Tao mới nhóm quyền thành công")
    res.redirect("/admin/roles")
  } catch (error) {
    console.error("Lỗi khi tạo mới nhóm quyền:", error)
    res.status(500).send("Đã xảy ra lỗi khi tạo mới nhóm quyền")
  }
}

// [PATCH]: /admin/roles/delete/:id
export const deleteRole = async (req: Request, res: Response) => {

    const id = req.params.id
    const role = await Role.findOne({
      _id: id,
      deleted: false
    })
    if(!role){
      console.log("Không tìm thấy nhóm quyền")
    }
    else{
      await Role.updateOne({
        _id: id
      },{
        deleted: true
      })
      console.log("Xóa nhóm quyền thành công")
      res.redirect("/admin/roles")
    }
 
}

// [PATCH]: /admin/roles/edit/:id
export const edit = async (req: Request, res: Response) => {

    const id = req.params.id
    const role = await Role.findOne({
      _id: id,
      deleted: false
    })
    res.render("admin/pages/roles/edit",{
      pageTitle: "Chỉnh sửa nhóm quyền",
      data: role
    })
 
}

// [PATCH]: /admin/roles/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    
  const id = req.params.id
  const role = await Role.findOne({
    _id: id})
  if(!role){
    console.log("Không tìm thấy nhóm quyền")
  }
  else{
    await Role.updateOne({
      _id: id
    },{
      ...req.body
    })
    console.log("Cập nhật nhóm quyền thành công")
    res.redirect("/admin/roles") 
  }
}
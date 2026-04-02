import { Request, Response } from "express"
import Role from "../../models/role.model"
import paginationHelper from "../../helpers/pagination"
import searchHelper from "../../helpers/search"
// [GET]: /admin/roles
export const index = async (req: Request, res: Response) => {
  const find : {
      deleted: boolean,
      title?: RegExp
    } = {
      deleted: false,
    }
    if(req.query.keyword){
      const regex = searchHelper(req.query) 
      find.title = regex
    }
  const pagination = {
    limitItem: 4,
    currentPage: 1, 
    skip: 1
  }
  const totalItems = await Role.countDocuments(find)
  paginationHelper(req.query, totalItems, pagination)
  const role = await Role.find(find).skip(pagination.skip).limit(pagination.limitItem)
  res.render("admin/pages/roles/index",{
    pageTitle: "Nhóm quyền",
    records: role,
    pagination
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

// [GET]: /admin/roles/permissions
export const permissions = async (req: Request, res: Response) => {
  const roles = await Role.find({
  deleted: false
})
  res.render("admin/pages/roles/permissions",{
    pageTitle: "Phân quyền",
    records: roles
  })
}

// [PATCH]: /admin/roles/permissions
export const permissionsPatch = async (req: Request, res: Response) => {
  try{
    const permissions = JSON.parse(req.body.permissions)
    for(const item of permissions){
      await Role.updateOne({
        _id: item.id
      },{
        permissions: item.permissions
      })
    }
    console.log("Cập nhật quyền thành công")
    res.redirect("/admin/roles/permissions")
    console.log(permissions)
  }
  catch(error){
    console.error("Lỗi khi cập nhật quyền:", error)
    res.status(500).send("Đã xảy ra lỗi khi cập nhật quyền")
  }
}

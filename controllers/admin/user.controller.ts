import { Request, Response } from "express"
import User from "../../models/user.model"
import paginationHelper from "../../helpers/pagination"
import searchHelper from "../../helpers/search"
// [GET]: /admin/accounts
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
  const totalItems = await User.countDocuments(find)
  paginationHelper(req.query, totalItems, pagination)
 const users = await User.find(find).skip(pagination.skip).limit(pagination.limitItem)
  res.render("admin/pages/users/index", {
    pageTitle: "Danh sách người dùng",
    users: users,
    pagination
  })
}
// [PATCH]: /admin/singers/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id = req.params.id
  const status = req.params.status 
  const user = await User.findOne({
    _id: id,
    deleted: false
  })
  if(!user){
    console.log("Không tìm thấy người dùng")
  } else {
    await User.updateOne({
      _id: id
    }, {
      status: status
    })
    console.log("Cập nhật trạng thái người dùng thành công")
  } 
  res.redirect("/admin/users")
}
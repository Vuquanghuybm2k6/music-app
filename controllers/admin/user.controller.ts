import { Request, Response } from "express"
import User from "../../models/user.model"
// [GET]: /admin/accounts
export const index = async (req: Request, res: Response) => {
 const users = await User.find({
    deleted: false
  })
  res.render("admin/pages/users/index", {
    pageTitle: "Danh sách người dùng",
    users: users
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
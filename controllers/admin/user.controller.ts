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
import { Request, Response } from "express"
import Role from "../../models/role.model"

// [GET]: /admin/dashboard
export const index = async (req: Request, res: Response) => {
  const role = await Role.find({
    deleted: false
  })
  res.render("admin/pages/roles/index",{
    pageTitle: "Nhóm quyền",
    records: role
  })
}

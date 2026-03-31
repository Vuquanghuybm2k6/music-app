import { Request, Response } from "express"
import Role from "../../models/role.model"
import Account from "../../models/account.model"
// [GET]: /admin/accounts
export const index = async (req: Request, res: Response) => {
  const find = {
    deleted: false
  }
  interface AccountLean {
    _id: string
    role_id: string
    [key: string]: any
  }
  const records = await Account
    .find(find)
    .select("-password -token")
    .lean<AccountLean[]>()
    .exec()
  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false
    })
      .lean()
      .exec()
    if (role) {
      record.role = role
    }
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  })
}

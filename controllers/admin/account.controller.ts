import { Request, Response } from "express"
import Role from "../../models/role.model"
import Account from "../../models/account.model"
import md5 from "md5"
import {systemConfig} from "../../config/config"
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

// [GET]: /admin/accounts/create
export const create = async (req: Request, res: Response) => {
  const roles = await Role.find({
    deleted: false
  })
  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles
  })
}
// [POST]: /admin/accounts/create
export const createPost = async (req: Request, res: Response) => {
  const emailExit = await Account.findOne({
    email: req.body.email,
    deleted: false
  })
  if (emailExit) {
    console.log("Email đã tồn tại")
    res.redirect(req.get("Referer"))
  } else {
    req.body.password = md5(req.body.password)
    let avatar = ""
    if(req.body.avatar){
      avatar = req.body.avatar[0]
    }
    const dataAccount = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      role_id: req.body.role_id,
      status: req.body.status,
      avatar: avatar
    }
    const record = new Account(dataAccount)
    await record.save()
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    console.log("Tạo tài khoản thành công")
  }
}
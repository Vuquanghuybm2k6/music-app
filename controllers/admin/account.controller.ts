import { Request, Response } from "express"
import Role from "../../models/role.model"
import Account from "../../models/account.model"
import md5 from "md5"
import {systemConfig} from "../../config/config"
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
  interface AccountLean {
    _id: string
    role_id: string
    [key: string]: any
  }
  const pagination = {
    limitItem: 4,
    currentPage: 1, 
    skip: 1
  }
  const totalItems = await Account.countDocuments(find)
  paginationHelper(req.query, totalItems, pagination)
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
  for(const record of records){
    console.log(record._id)
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records,
    pagination
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

// [GET]: /admin/accounts/edit
export const edit = async (req, res) => {
  try {
    const id = req.params.id
    const account = await Account.findOne({
      _id: id,
      deleted: false
    }).select("-password -token")
    const roles = await Role.find({
      deleted: false
    })
    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      account: account,
      roles: roles
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
  }
}

// [PATCH]: /admin/accounts/edit
export const editPatch = async (req, res) => {
  const id = req.params.id
  const emailExit = await Account.findOne({
    _id: {
      $ne: id
    }, 
    email: req.body.email,
    deleted: false
  })
  if (emailExit) {
    console.log("Email đã tồn tại")
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password)
    } else {
      delete req.body.password
    }
    let avatar = ""
    if(req.body.avatar){
      avatar = req.body.avatar[0]
    }
    // Avatar is an array, but in mongoDB, avatar is a string, we need to convert it to string before save to mongoDB
    await Account.updateOne({
      _id: id
    }, {
      ...req.body,
      avatar: avatar
    })
    console.log("Cập nhật tài khoản thành công")  
  }
  res.redirect(req.get("Referer"))
}

// [PATCH]: /admin/accounts/delete
export const deleteAccount = async (req, res) => {
  const id = req.params.id
  const account = await Account.findOne({
    _id: id,
    deleted: false
  })
  if (!account) {
    console.log("Không tìm thấy tài khoản")
  } else {
  await Account.updateOne({
    _id: id
  }, {
    deleted: true
  })
  console.log("Xóa tài khoản thành công")
  res.redirect(req.get("Referer"))
}
}

// [GET]: /admin/accounts/detail
export const detail = async (req, res) => {
  try {
    const id = req.params.id
    const account = await Account.findOne({
      _id: id,
      deleted: false
    }).select("-password -token")
    const role = await Role.findOne({
      _id: account?.role_id,
      deleted: false
    })
    res.render("admin/pages/accounts/detail", {
      pageTitle: "Chi tiết tài khoản",
      account: account,
      role: role
    })
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/accounts`)
  }
}

// [PATCH]: /admin/accounts/change-status/:status/:id
export const changeStatus = async (req: Request, res: Response) => {
  const id = req.params.id
  const status = req.params.status 
  const account = await Account.findOne({
    _id: id,
    deleted: false
  })
  if(!account){
    console.log("Không tìm thấy tài khoản")
  } else {
    await Account.updateOne({
      _id: id
    }, {
      status: status
    })
    console.log("Cập nhật trạng thái tài khoản thành công")
  } 
  res.redirect("/admin/accounts")
}
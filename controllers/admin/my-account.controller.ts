import { Request, Response } from "express"
import Account from "../../models/account.model"
import { systemConfig } from "../../config/system"
import md5 from "md5"
// [GET]: /admin/my-account
export const index = async (req: Request, res: Response) => {
  const token = req.cookies.token
  const user = await Account.findOne({
    token: token,
    deleted: false, 
  })
  res.render("admin/pages/my-account/index",{
    pageTitle: "Tài khoản của tôi",
    user: user
  })
}

// [GET] /admin/my-account/edit
export const edit = (req: Request, res: Response) => {
  res.render('admin/pages/my-account/edit', {
    pageTitle: "Chỉnh sửa thông tin cá nhân"
  });
}
// [PATCH] /admin/my-account/edit
export const editPatch = async (req: Request, res: Response) => {
  const id = res.locals.user.id
  const emailExit = await Account.findOne({
    _id: {
      $ne: id
    },
    email: req.body.email,
    deleted: false
  })
  if (emailExit) {
    console.log("Email đã tồn tại")
    return res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`)
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password)
    } else {
      delete req.body.password
    }
  }
  console.log(req.body)
  let avatar = ""
  const dataUpdate = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    avatar: avatar
  }
  if(req.body.avatar) {
    dataUpdate["avatar"] = req.body.avatar[0]
  }
  await Account.updateOne({
      _id: id
    },
    dataUpdate
  )
  console.log("Cập nhật tài khoản thành công")
  res.redirect(`${systemConfig.prefixAdmin}/my-account/edit`)
}
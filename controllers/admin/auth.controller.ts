import Account  from "../../models/account.model"
import {systemConfig} from "../../config/system"
import md5 from "md5"
import {Request, Response} from "express"
// [GET]: /admin/auth/login
export const login = async (req: Request, res: Response) => {
  if (req.cookies.token) { 
    const user = await Account.findOne({
      token: req.cookies.token,
      deleted: false,
      status: "active"
    })
    if (user) {
      return res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
    } else { 
      res.clearCookie("token")
    }
  }
  res.render("admin/pages/auth/login", {
    pageTitle: "Trang đăng nhập"
  })
}
// [POST]: /admin/auth/login
export const loginPost = async (req: Request, res: Response) => {
  const email = req.body.email
  const password = req.body.password
  const user = await Account.findOne({
    email: email,
    deleted: false
  })
  if (!user) {
    console.log("Email không tồn tại")
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    return
  } else {
    if (md5(password) != user.password) {
      console.log("Sai mật khẩu")
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
      return
    } else {
      if (user.status == "inactive") {
        console.log("Tài khoản này hiện đang bị khóa")
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return
      } else {
        res.cookie("token", user.token)
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
      }
    }
  }
}
// [GET]: /admin/auth/login
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token")
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
}
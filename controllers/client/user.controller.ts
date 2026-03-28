import { Request, Response } from "express"
import User from '../../models/user.model'
import md5 from "md5"

// [GET]: /users/register
export const register = async (req: Request, res: Response) => {
  res.render("client/pages/user/register",{
    pageTitle: "Đăng ký tài khoản",
  })
}

// [POST]: /users/register
export const registerPost = async (req: Request, res: Response) => {
  const email = req.body.email
  const emailExit = await User.findOne({
    email: email
  })
  if(emailExit){
    console.log("Email đã tồn tại")
    return res.redirect("/user/register")
  }
  req.body.password = md5(req.body.password)
  const user = new User(req.body)
  await user.save()
  res.cookie("tokenUser", user.tokenUser)
  console.log("Đăng ký thành công")
  res.redirect("/")
}

// [GET]: /users/register
export const login = async (req: Request, res: Response) => {
  res.render("client/pages/user/login",{
    pageTitle: "Đăng ký nhập",
  })
}

// [POST]: /users/login
export const loginPost = async (req: Request, res: Response) => {
  const email = req.body.email
  const user = await User.findOne({
    email: email,
    deleted: false
  })
  if(!user){
    console.log("Email không tồn tại")
    res.redirect(req.get("Referer"))
  }
  else{
    if(md5(req.body.password) == user.password){
      console.log("Đăng nhập thành công")
      res.cookie("tokenUser", user.tokenUser)
      res.redirect("/")
    }
    else{
      console.log("Sai mật khẩu")
      res.redirect(req.get("Referer"))
    }
  }
}

// [GET]: /users/register
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("tokenUser")
  res.redirect("/user/login")
}

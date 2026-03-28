import { Request, Response } from "express"
import User from '../../models/user.model'
import md5 from "md5"
import ForgotPassword from "../../models/forgot-password.model"
import * as generateHelper from '../../helpers/generate'
import {sendMail} from '../../helpers/sendMail'
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

// [GET]: /users/password/forgot
export const forgotPassword = async (req: Request, res: Response) => {
  res.render("client/pages/user/forgot-password",{
    pageTitle: "Lấy lại mật khẩu"
  })
}

// [POST]: /users/pasword/forgot
export const forgotPasswordPost = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false
  })
  if(!user){
    console.log("Email không tồn tại")
  }
  else{ 
    // Create OTP 
    const email = req.body.email
    await ForgotPassword.deleteMany({email: email})
    const otp = generateHelper.generateRandomNumber(6)
    const objectForgotPassword = {
      email: email,
      otp: otp,
      expiresAt: Date.now()

    }
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()
    // Send OTP to user's gmail
    const subject = `Mã OTP xác mình lấy lại mật khẩu`
    const html = `Mã OTP xác mình lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút. Lưu ý không được để lộ mã OTP`
    sendMail(email,subject,html)
    res.redirect(`/user/password/otp?email=${email}`)
  }
}


// [GET]: /users/password/otp
export const otpPassword = async (req: Request, res: Response) => {
  const email = req.query.email
  res.render("client/pages/user/otp-password",{
    pageTitle: "Nhập mã OTP",
    email
  })
}

// [POST]: /users/password/otp
export const otpPasswordPost = async (req: Request, res: Response) => {
  const email = req.body.email
  const otp = req.body.otp
  const forgotPassword = await ForgotPassword.findOne({
    email: email,
    otp: otp
  })
  if(!forgotPassword){
    console.log("Mã OTP không hợp lệ")
    res.redirect(req.get("Referer"))
  }
  else{
    const user= await User.findOne({
      email: email,
      deleted: false
    })
    if (!user) {
      console.log("User không tồn tại")
      return res.redirect(req.get("Referer"))
    }
    res.cookie("tokenUser", user.tokenUser)
    res.render("client/pages/user/reset-password",{
      pageTitle: "Đặt lại mật khẩu",
      email
    })
  }
}

// [GET]: /users/password/reset
export const resetPassword = async (req: Request, res: Response) => {      
  res.render("client/pages/user/reset-password",{
    pageTitle: "Đặt lại mật khẩu",
  })
}

// [POST]: /users/password/reset    
export const resetPasswordPost = async (req: Request, res: Response) => {
  const password = req.body.password  
  const tokenUser = req.cookies?.tokenUser
  if(!tokenUser){
    console.log("Token không tìm thấy trong cookie")
    return res.redirect('/user/login')
  }
  console.log(tokenUser)
  const user = await User.findOne({
    tokenUser: tokenUser,
    deleted: false
  })
  if(!user){
    console.log("Người dùng không tồn tại")
    res.redirect(req.get("Referer"))
  }
  else{
    await User.updateOne({
      tokenUser: tokenUser
    },{   
      password: md5(password)
    })
    res.redirect("/user/login")
  }
}

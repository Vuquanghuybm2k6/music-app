
import { Request, Response, NextFunction } from "express"
import { systemConfig } from "../../config/system"
export const createPost = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.fullName){
    req.flash("error", "Vui lòng nhập họ tên")
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    return
  }
  if(!req.body.email){
    req.flash("error", "Vui lòng nhập email")
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    return
  }
  if(!req.body.password){
    req.flash("error", "Vui lòng nhập mật khẩu")
    res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
    return
  }
  next()
}
export const editPatch = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.fullName){
    req.flash("error", "Vui lòng nhập họ tên")
    res.redirect(`${systemConfig.prefixAdmin}/accounts/edit`)
    return
  }
  if(!req.body.email){
    req.flash("error", "Vui lòng nhập email")
    res.redirect(`${systemConfig.prefixAdmin}/accounts/edit`)
    return
  }
  next()
}
import { Request, Response, NextFunction } from "express"
import { systemConfig } from "../../config/system"
export const createPost = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.title){
    req.flash("error", "Vui lòng nhập tiêu đề")
    res.redirect(`${systemConfig.prefixAdmin}/topics/create`)
    return
  }
  next()
}
export const editPatch = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.title){
    req.flash("error", "Vui lòng nhập tiêu đề")
    res.redirect(`${systemConfig.prefixAdmin}/topics/edit`)
    return
  }
  next()
}
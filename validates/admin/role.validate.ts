import { Request, Response, NextFunction } from "express"
import { systemConfig } from "../../config/system"
export const createPost = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.title){
    req.flash("error", "Vui lòng nhập lại tiêu đề")
    res.redirect(`${systemConfig.prefixAdmin}/roles/create`)
    return
  }
  next()
}

export const editPatch = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.title){
    req.flash("error", "Vui lòng nhập lại tiêu đề")
    res.redirect(`${systemConfig.prefixAdmin}/roles/create`)
    return
  }
  next()
}
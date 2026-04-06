import { Request, Response, NextFunction } from "express"
import { systemConfig } from "../../config/system"
export const createPost = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.fullName){
    req.flash("error", "Vui lòng nhập teen ca sĩ")
    res.redirect(`${systemConfig.prefixAdmin}/singers/create`)
    return
  }
  next()
}
export const editPatch = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.fullName){
    req.flash("error", "Vui lòng nhập teen ca sĩ")
    res.redirect(`${systemConfig.prefixAdmin}/singers/edit`)
    return
  }
  next()
}
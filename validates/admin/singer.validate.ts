import { Request, Response, NextFunction } from "express"
import { systemConfig } from "../../config/system"
export const createPost = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.fulName){
    req.flash("error", "Vui lòng nhapaj teen ca sĩ")
    res.redirect(`${systemConfig.prefixAdmin}/singers/create`)
    return
  }
  next()
}
export const editPatch = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.fulName){
    req.flash("error", "Vui lòng nhapaj teen ca sĩ")
    res.redirect(`${systemConfig.prefixAdmin}/singers/edit`)
    return
  }
  next()
}
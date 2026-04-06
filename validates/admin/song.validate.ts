import { Request, Response, NextFunction } from "express"
import { systemConfig } from "../../config/system"
export const createPost = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.title){
    req.flash("error", "Vui lòng nhập tiêu đề")
    res.redirect(`${systemConfig.prefixAdmin}/songs/create`)
    return
  }
  if(!req.body.topicId){
    req.flash("error", "Vui lòng nhập chủ đề bài hát")
    res.redirect(`${systemConfig.prefixAdmin}/songs/create`)
    return
  }
  if(!req.body.singerId){
    req.flash("error", "Vui lòng nhập tên ca sĩ")
    res.redirect(`${systemConfig.prefixAdmin}/songs/create`)
    return
  }

  next()
}
export const editPatch = (req:Request,res: Response,next:NextFunction) =>{
  if(!req.body.title){
    req.flash("error", "Vui lòng nhập tiêu đề")
    res.redirect(`${systemConfig.prefixAdmin}/songs/edit/${req.params.id}`)
    return
  }
  if(!req.body.topicId){
    req.flash("error", "Vui lòng nhập chủ đề bài hát")
    res.redirect(`${systemConfig.prefixAdmin}/songs/edit/${req.params.id}`)
    return
  }
  if(!req.body.singerId){
    req.flash("error", "Vui lòng nhập tên ca sĩ")
    res.redirect(`${systemConfig.prefixAdmin}/songs/edit/${req.params.id}`)
    return
  }
  next()
}
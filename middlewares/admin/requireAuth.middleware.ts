import { systemConfig } from "../../config/system"
import Account from "../../models/account.model"
import Role from "../../models/role.model"
import {Request, Response, NextFunction} from "express"
export const requireAuth = async(req: Request, res: Response, next: NextFunction) =>{
  if(!req.cookies.token){
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    return
  }
  else{
    const user = await Account.findOne({token: req.cookies.token, deleted: false}).select("-password")
    if(!user){
      res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
      return
    }
    else{
      const role = await Role.findOne({_id: user.role_id}).select("title permissions")
      res.locals.user = user
      res.locals.role = role  
      next()
    }
  }
}
import { Request, Response, NextFunction } from "express"
import User from "../../models/user.model"

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if(!req.cookies.tokenUser){
    return res.redirect("/user/login")
  }
  else{
    const tokenUser = req.cookies.tokenUser
    const user = User.findOne({
      tokenUser: tokenUser,
      deleted: false
    })
    if(!user){ // When user enters a random tokenUser value in cookie
      console.log("Token không hợp lệ")
      return res.redirect("/user/login")
    }
    else{
      res.locals.user = user
      next()
    }
  }
}
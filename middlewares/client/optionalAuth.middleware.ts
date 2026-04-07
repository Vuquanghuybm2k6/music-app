import { Request, Response, NextFunction } from "express"
import User from "../../models/user.model"

export const optionalAuth = async (req: Request, res: Response, next: NextFunction) => {
  if(req.cookies.tokenUser){
    const tokenUser = req.cookies.tokenUser
    const user = await User.findOne({
      tokenUser: tokenUser,
      deleted: false
    })
     res.locals.user = user
  }
  next()
}
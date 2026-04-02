import SettingGeneral  from "../../models/settings-general.model"
import { Request, Response, NextFunction } from "express"
export const settingGeneral = async (req: Request, res: Response, next: NextFunction) =>{
  const settingGeneral = await SettingGeneral.findOne({})
  res.locals.settingGeneral = settingGeneral
  next()
}
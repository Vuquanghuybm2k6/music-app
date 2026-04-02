import { Request, Response } from "express"
import SettingGeneral from "../../models/settings-general.model"
import { systemConfig } from "../../config/config"

// [GET]: /admin/settings/general
export const general = async (req: Request, res: Response) => {
  const settingGeneral = await SettingGeneral.findOne()
  res.render("admin/pages/settings/general",{
    pageTitle: "Setting",
    settingGeneral
  })
}

// [PATCH]: /admin/settings/general
export const generalPost = async (req: Request, res: Response) => {
  try{
    let logo = ""
    const dataSettingGeneral:any = {
      websiteName: req.body.websiteName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      copyright: req.body.copyright,
      logo: logo
    }
    if(req.body.logo){
      dataSettingGeneral["logo"] = req.body.logo[0]
    }
    const settingGeneral = await SettingGeneral.findOne()
    if(!settingGeneral){
      const newSettingGeneral = new SettingGeneral(dataSettingGeneral)
      await newSettingGeneral.save()
    }else{
      await SettingGeneral.updateOne({_id: settingGeneral.id}, dataSettingGeneral)
    }
    res.redirect(`${systemConfig.prefixAdmin}/settings/general`)
    console.log("Cập nhật thành công")
  }
  catch(error){
    console.log("Cập nhật thất bại")
    res.redirect(`${systemConfig.prefixAdmin}/settings/general`)
  }
}
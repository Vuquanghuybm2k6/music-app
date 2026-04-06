import { Request, Response } from "express"
import Song from "../../models/song.model"
import Topic from "../../models/topic.model"
import Singer from "../../models/singer.model"
import User from "../../models/user.model"
import Account from "../../models/account.model"
// [GET]: /admin/dashboard
export const index = async (req: Request, res: Response) => {
  const statistic = {
      topic: {
        total: 0,
        active: 0,
        inactive: 0
      },
      singer: {
        total: 0,
        active: 0,
        inactive: 0
      },
      song: {
        total: 0,
        active: 0,
        inactive: 0
      },
      user: {
        total: 0,
        active: 0,
        inactive: 0
      },
      account: {
        total: 0,
        active: 0,
        inactive: 0
      },
    }
  
    // Topic
    statistic.topic.total = await Topic.countDocuments({deleted: false})
    statistic.topic.active = await Topic.countDocuments({status: "active"})
    statistic.topic.inactive = await Topic.countDocuments({status: "inactive"})
    
    // Singer 
    statistic.singer.total = await Singer.countDocuments({deleted: false})
    statistic.singer.active = await Singer.countDocuments({status: "active"})
    statistic.singer.inactive = await Singer.countDocuments({status: "inactive"})

    // Song 
    statistic.song.total = await Song.countDocuments({deleted: false})
    statistic.song.active = await Song.countDocuments({status: "active"})
    statistic.song.inactive = await Song.countDocuments({status: "inactive"})
  
    // Admin
    statistic.account.total = await Account.countDocuments({deleted: false})
    statistic.account.active = await Account.countDocuments({status: "active"})
    statistic.account.inactive = await Account.countDocuments({status: "inactive"})
  
    // User
    statistic.user.total = await User.countDocuments({deleted: false})
    statistic.user.active = await User.countDocuments({status: "active"})
    statistic.user.inactive = await User.countDocuments({status: "inactive"})
    res.render("admin/pages/dashboard/index.pug",
      {
        pageTitle: "Trang dashboard",
        statistic: statistic
      }
    )
}

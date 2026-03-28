import { Request, Response } from "express"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
// [GET]: /
export const index = async (req: Request, res: Response) => {
  const songsNew = await Song.find({
    deleted: false,
    status: "active"
  }).limit(6).sort({ position: "desc" }).select("avatar title slug singerId like")
  for (const song of songsNew) {
    const infoSinger = await Singer.findOne({ _id: song.singerId });
    (song as any).infoSinger = infoSinger || { fullName: "Không rõ" }; // fallback
  }
  const songsFavorite = await Song.find({
    deleted: false,
    status: "active"
  }).sort({like: -1}).limit(6).select("avatar title slug singerId like")
  for (const song of songsFavorite) {
    const infoSinger = await Singer.findOne({ _id: song.singerId });
    (song as any).infoSinger = infoSinger || { fullName: "Không rõ" }; // fallback
  }
  res.render("client/pages/home/index",{
    pageTitle: "Trang chủ",
    songsNew,
    songsFavorite
  })
}

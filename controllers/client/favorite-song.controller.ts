import { Request, Response } from "express"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import FavoriteSong from "../../models/favorite-song.model"
// [GET]: /favorite-songs/
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    userId: res.locals.user.id,
    deleted: false
  })
  for(const item of favoriteSongs){
    const infoSong = await Song.findOne({
      _id: item.songId
    })
    if (!infoSong) continue
    const infoSinger = await Singer.findOne({
      _id: infoSong.singerId
    });
    (item as any)["infoSong"] = infoSong;
    (item as any)["infoSinger"] = infoSinger || { fullName: "Không rõ" };
  }
  res.render("client/pages/favorite-songs/index.pug",{
    pageTitle: "Bài hát yêu thích",
    favoriteSongs
  })
}

import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"
import FavoriteSong from "../../models/favorite-song.model"
// [GET]: /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    status: "active",
    deleted: false
  })
  console.log(topic.id)
  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false
  }).select("avatar title slug singerId like")
  console.log(songs)
  for(const song of songs){
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false
    })
    song["infoSinger"] = infoSinger
  }
  console.log(songs)
  res.render("client/pages/songs/list.pug",{
    pageTitle: topic.title,
    songs
  })
}

// [GET]: /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong as string
  const song  = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false
  })
  const singer = await Singer.findOne({
    _id: song.singerId,
    deleted: false
  }).select("fullName")
  const topic = await Topic.findOne({
    _id: song.topicId,
    deleted: false
  }).select("title")
  const favoriteSong = await FavoriteSong.findOne({
    songId: song.id
  })
  song["idFavoriteSong"] = FavoriteSong ? true : false
  res.render("client/pages/songs/detail.pug",{
    pageTitle: "Chi tiết bài hát",
    song,
    singer,
    topic
  })
}

// [PATCH]: /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong:string = req.params.idSong as string
  const typeLike: string = req.params.typeLike as string
  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false
  })
  const newLike:number = typeLike == "like" ? song.like + 1 : song.like-1
  await Song.updateOne({
    _id: idSong,
  },{
    like: typeLike == "like" ? song.like + 1 : song.like-1
  })
  res.json({
    code:200,
    message: "Cập nhật lượt like thành công",
    like: newLike
  })
}

// [PATCH]: /songs/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const idSong:string = req.params.idSong as string
  const typeFavorite: string = req.params.typeFavorite as string
  switch (typeFavorite){
    case "favorite":
      const existFavoriteSong = await FavoriteSong.findOne({
        songId: idSong
      })
      if(!existFavoriteSong){
        const record = new FavoriteSong({
          //userId: "",
          songId: idSong
        })
        await record.save()
      }
      break
    case "unfavorite":
      await FavoriteSong.deleteOne({
        songId: idSong
      })
      break
    default:
      break
  }
  res.json({
    code:200,
    message: "Cập nhật yêu thích thành công",
  })
}
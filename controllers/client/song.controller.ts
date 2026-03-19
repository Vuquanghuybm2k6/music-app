import { Request, Response } from "express"
import Topic from "../../models/topic.model"
import Song from "../../models/song.model"
import Singer from "../../models/singer.model"

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
  res.render("client/pages/songs/detail.pug",{
    pageTitle: "Chi tiết bài hát",
    song,
    singer,
    topic
  })
}
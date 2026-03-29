import { Request, Response } from "express"
import Song from "../../models/song.model"
import Topic from "../../models/topic.model"
import Singer from "../../models/singer.model"
import { systemConfig } from "../../config/config"

// [GET]: /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false
  })
  res.render("admin/pages/songs/index",{
    pageTitle: "Danh sách bài hát",
    songs
  })
}

// [GET]: /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false,
    status: "active"
  }).select("title")
  const singers = await Singer.find({
    deleted: false,
    status: "active"
  }).select("fullName")
  res.render("admin/pages/songs/create",{
    pageTitle: "Thêm mới bài hát",
    topics,
    singers
  })
}

// [POST]: /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  // khi upload, các file được lưu dưới dạng một mảng 
  let avatar = ""
  let audio = ""
  if(req.body.avatar){
    avatar = req.body.avatar[0]
  }
  if(req.body.audio){
    audio = req.body.audio[0]
  }
  const dataSong = {
  title: req.body.title,
  topicId: req.body.topicId,
  singerId: req.body.singerId,
  description: req.body.description,
  status: req.body.status,
  avatar: avatar,
  audio: audio,
  lyrics: req.body.lyrics
  }
  const song = new Song(dataSong)
  await song.save()
  res.redirect(`/${systemConfig.prefixAdmin}/songs`)
}

// [GET]: /admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id 
  const song = await Song.findOne({
    _id: id,
    deleted: false
  })
  const topics = await Topic.find({
    deleted: false,
    status: "active"
  }).select("title")
  const singers = await Singer.find({
    deleted: false,
    status: "active"
  }).select("fullName")
  res.render("admin/pages/songs/edit",{
    pageTitle: "Chỉnh sửa mới bài hát",
    song,
    topics,
    singers
  })
}

// [PATCH]: /admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id
  const dataSong = {
  title: req.body.title,
  topicId: req.body.topicId,
  singerId: req.body.singerId,
  description: req.body.description,
  status: req.body.status,
  lyrics: req.body.lyrics
  }
  if(req.body.avatar){
    dataSong["avatar"] = req.body.avatar[0]
  }
  if(req.body.audio){
    dataSong["audio"] = req.body.audio[0]
  }
  await Song.updateOne({
    _id: id
  }, dataSong)
  res.redirect(req.get("Referer"))
}

// [PATCH]: /admin/songs/delete/:id
export const deleteSong = async (req: Request, res: Response) => {
  const id = req.params.id
  const song = await Song.findOne({
    _id: id,
    deleted: false
  })
  if(!song){
    console.log("Bài hát không tồn tại")
  }
  else{
    await Song.updateOne({
      _id: id
    },{
      deleted: true
    })
  }
  res.redirect(req.get("Referer"))  
}

// [GET]: /admin/songs/detail/:id
export const detail = async (req: Request, res: Response) => {  
  const id = req.params.id
  const song = await Song.findOne({
    _id: id,
    status: "active",
    deleted: false
  })
  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false
  })
  const infoSinger = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false
  })
  song["infoSinger"] = infoSinger
  song["topic"] = topic
    res.render("admin/pages/songs/detail",{
      pageTitle: "Chi tiết bài hát",
      song
    })
}
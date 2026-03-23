export default function handler(req, res) {
  res.status(200).json({
    location: "https://picsum.photos/300"
  })
}
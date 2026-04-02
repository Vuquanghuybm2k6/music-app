export default (query)=>{
  let keyword = query.keyword
  const regex = new RegExp(keyword, "i")
  return regex
}
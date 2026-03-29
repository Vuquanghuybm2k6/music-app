// Upload Image
const uploadImage = document.querySelector("[upload-image]");

if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const image = URL.createObjectURL(e.target.files[0]);
      uploadImagePreview.src = image;
    }
  });
}
// End Upload Image

// Upload Audio
const uploadAudio = document.querySelector("[upload-audio]");

if (uploadAudio) {
  const uploadAudioInput = uploadImage.querySelector("[upload-audio-input]");
  const uploadAudioPlay = uploadImage.querySelector("[upload-audio-play]");
  const source = uploadAudio.querySelector("source")
  uploadAudioInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      const audio = URL.createObjectURL(e.target.files[0]);
      source.src = audio;
      uploadAudioPlay.load()
    }
  });
}
// End Upload Audio

// Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]")
if(buttonsDelete.length>0){
  buttonsDelete.forEach(button=>{
    button.addEventListener("click",()=>{
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này")
      if(isConfirm){
        const formDeleteItem = document.querySelector("#form-delete-topic")
        const id = button.getAttribute("data-id")
        const path = formDeleteItem.getAttribute("data-path")
        const action = `${path}/${id}?_method=PATCH`
        formDeleteItem.action = action
        formDeleteItem.submit()
      }
    })
  })
}
// End Delete Item
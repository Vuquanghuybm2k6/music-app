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

// Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]")
if(buttonsChangeStatus.length > 0){
  buttonsChangeStatus.forEach(button=>{
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-path")
    button.addEventListener("click", ()=>{
      const status = button.getAttribute("data-status")
      const id = button.getAttribute("data-id")
      let newStatus = status == "active" ? "inactive": "active"
      const action = `${path}/${newStatus}/${id}?_method=PATCH`
      formChangeStatus.action = action
      formChangeStatus.submit()
    })
  })
}
// End Change Status
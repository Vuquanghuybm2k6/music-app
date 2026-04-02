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

// Checkbox
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name= 'id']");
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      })
    } else {

      inputsId.forEach((input) => {
        input.checked = false;
      })
    }
  })

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true
      } else {
        inputCheckAll.checked = false
      }
    })
  })
}
// End Checkbox

// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]")
    const inputsCheck = checkboxMulti.querySelectorAll("input[name='id']:checked")
    const typeChange = e.target.elements.type.value
    if (typeChange == "delete-all") {
      const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này")
      if (!isConfirm) {
        return
      }
    }
    if (inputsCheck.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']")
      inputsCheck.forEach(input => {
        const id = input.value;
          ids.push(id)
      })
      inputIds.value = ids.join(", ")
      console.log(ids.join(", "));
      formChangeMulti.submit();
    } else {
      alert("Vui lòng nhập lại")
    }
  })
}

// End Form Change Multi

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]")
if (buttonsPagination.length > 0) {
  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      let url = new URL(window.location.href)
      const page = button.getAttribute("button-pagination")
      url.searchParams.set("page", page)
      window.location.href = url.href
    })
  })
}
// End Pagination

// Form Search
const formSearch = document.querySelector("#form-search")
if (formSearch) {
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault()
    const url = new URL(window.location.href)
    const keyword = e.target.elements.keyword.value
    if (keyword) {
      url.searchParams.set("keyword", keyword)
    } else {
      url.searchParams.delete("keyword")
    }
    window.location.href = url.href

  })
}
// End Form Search
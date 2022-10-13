
// Tooltips -- don't work, look into why
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// have they agreed to the CoC yet?
let coc = false
const header = 'header'
const post = 'post'
const avatar = 'avatar'

const server = 'https://devreldiaries.com'
// Set up the Markdown editor
const easyMDE = new EasyMDE({
  autoDownloadFontAwesome: true,
  autosave: {
    enabled: true,
    uniqueId: 'editor',
    delay: 10000,
  },
  previewImagesInEditor: true,
  showIcons: [
    'strikethrough',
    'code',
    'table',
    'redo',
    'undo',
    'clean-block',
    'horizontal-rule'
  ],
  element: document.getElementById('mde-input'),
})
easyMDE.value('') // clear the editor

// Enable the next text field as soon as you've typed into this one.
function enableNextField(e) {
  const inputs = document.getElementsByTagName('input')
  var t = this.event.target.id
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].id == t) {
      inputs[i + 1].disabled = false
      return
    }
  }
}

// upload an image
// @param {string} imageType - the type of the input field
function setImage(imageType) {
  var f
  if (imageType === header) {
    f = document.getElementById('headerFileInput').files[0]
    document.getElementById('headerFileInput').disabled = true
  } else if (imageType === post) {
    f = document.getElementById('postFileInput').files[0]
  } else if (imageType === avatar) {
    f = document.getElementById('avatarFileInput').files[0]
    document.getElementById('avatarFileInput').disabled = true
  }
  if (!f.type === 'image/jpeg' || !f.type === 'image/png' || !f.type === 'image/gif' ) {
    if (imageType === header) {
      const cl = document.getElementById('headerFileInput')
      cl.value = ''
    } else if (imageType === post) {
      const cl = document.getElementById('postFileInput')
      cl.value = ''
    } else if (imageType === avatar) {
      const cl = document.getElementById('avatarFileInput')
      cl.value = ''
    }
    return alert('Only image files of type .png, .jpg, .jpeg or .gif are acceptable. Please upload a valid image file.')
  }
  console.log('setImage: ' + f)
  const reader = new FileReader()
  reader.readAsDataURL(f)
  reader.onload = function () {
    var imgName = f.name
    if (imageType === header) {
      imgName = 'header-' + imgName
    } else if (imageType === post) {
      imgName = 'post-' + imgName
    } else if (imageType === avatar) {
      imgName = 'avatar-' + imgName
    }
    const data = {
      type: 'image',
      name: imgName,
      image: `${reader.result}`,
      title: `${document.getElementById('titleInput').value}`
    }
    var imgData = `${reader.result}`
    console.log(imgData)
    fetch(server + ':9494/submitImage', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status == 200) {
          console.log('Image uploaded successfully')
          response.json().then(data => {
            insertImage(data.location, imgData, imageType)
            console.log(data)
          })
        } else {
          const foo = response.body
          console.log('Image upload failed')
          alert('Image upload failed: ' + response.status + ' ' + response.statusText)
          if (imageType === header) {
            const cl = document.getElementById('headerFileInput')
            cl.value = ''
          } else if (imageType === post) {
            const cl = document.getElementById('postFileInput')
            cl.value = ''
          } else if (imageType === avatar) {
            const cl = document.getElementById('avatarFileInput')
            cl.value = ''
          }
        }
      })
      .catch((error) => {
        console.error('Image submit Error:', error)
      })
  };
}

// @param {string} location - the path of the image on the server
// @param {base64-encoded string} imgData - the base64 encoded image data
function insertImage(location, imgData, imageType) {
  var imageDiv
  if (imageType === header) {
    imageDiv = document.getElementById('header-image')
  } else if (imageType === post) {
    imageDiv = document.getElementById('post-image')
    cl = document.getElementById('postFileInput')
    cl.value = ''
  } else if (imageType === avatar) {
    imageDiv = document.getElementById('avatar-image')
  }
  const imageDivDiv = document.createElement('div')
  imageDiv.appendChild(imageDivDiv)
  if (imageType === header) {
    imageDivDiv.setAttribute('class', 'header-image-div-format')
  } else {
    imageDivDiv.setAttribute('class', 'upload-image')
  }
  imageDivDiv.setAttribute('id', server + '/dev-rel-diaries-server/' + location)
  imageDivDiv.setAttribute('location', location)
  const closeButton = document.createElement('button')
  closeButton.setAttribute('type', 'button')
  if (imageType === header || imageType === avatar) {
    closeButton.setAttribute('class', 'btn-close close-pos-header')
  } else {
    closeButton.setAttribute('class', 'btn-close close-pos')
  }
  closeButton.setAttribute('aria-label', 'Close')
  // handle the close button: and remove from server
  closeButton.addEventListener('click', (e) => {
    //TODO if the image is the header image, re-enable the header-image chooser
    const pNode = e.target.parentNode
    const findMe = ' ![image](' + pNode.id + ') '
    const savedLoc = pNode.getAttribute('location')
    if (savedLoc.indexOf('header') > 0 ) {
      //TODO: remove value from input field
      document.getElementById('headerFileInput').disabled = false
      const f = document.getElementById('headerFileInput')
      f.value = ''
    }
    if (savedLoc.indexOf('avatar') > 0 ) {
      document.getElementById('avatarFileInput').disabled = false
      const f = document.getElementById('avatarFileInput')
      f.value = ''
    }
    var data = {
      type: 'image',
      name: '',
      image: '',
      title: savedLoc
    }
    if (savedLoc.indexOf('header') <= 0 ) {
      var val = easyMDE.value()
      val = val.replace(findMe, '')
      easyMDE.value(val)
    }
    pNode.remove()
    // remove the image from the server
    fetch(server + ':9494/delImage', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status == 200) {
          console.log('Image deleted successfully')
        } else {
          console.log('Image delete failed')
        }
      })
      .catch((error) => {
        console.error('Image delete Error:', error)
      })
  })
  const im = document.createElement('img')
  im.setAttribute('src', `${imgData}`)
  console.log('Header: ' + location.indexOf('header'))
  console.log('Avatar: ' + location.indexOf('avatar'))
  if (location.indexOf('header') <= 0 && location.indexOf('avatar') <= 0) {
    const useCheckBox = document.createElement('input')
    useCheckBox.setAttribute('type', 'checkbox')
    useCheckBox.setAttribute('class', 'form-check-input use-pos')
    useCheckBox.setAttribute('id', 'useImage-' + location)
    // handle the use checkbox
    useCheckBox.addEventListener('change', (e) => {
      const pNode = e.target.parentNode
      if (e.target.checked) {
        pNode.setAttribute('class', 'upload-image selected')
        console.log('checked')
        var val = easyMDE.value()
        console.log(val)
        console.log(val.length)
        val += ' ![image](' + pNode.id + ') '
        easyMDE.value(val)
      } else {
        const findMe = ' ![image](' + pNode.id + ') '
        var val = easyMDE.value()
        val = val.replace(findMe, '')
        easyMDE.value(val)
        pNode.setAttribute('class', 'upload-image')
      }
    })
    const useCheckBoxLabel = document.createElement('label')
    useCheckBoxLabel.setAttribute('class', 'form-check-label form-label-pos')
    useCheckBoxLabel.setAttribute('for', 'useImage-' + location)
    useCheckBoxLabel.innerText = 'Use this image'
    imageDivDiv.appendChild(useCheckBox)
    imageDivDiv.appendChild(useCheckBoxLabel)
  }
  imageDivDiv.appendChild(closeButton)
  const d = document.createElement('div')
  d.appendChild(im)
  imageDivDiv.appendChild(d)
  if (location.indexOf('header') > 0) {
    d.setAttribute('class', 'header-image-div-format')
  } else if (location.indexOf('avatar') > 0) {
    d.setAttribute('class', 'avatar-image-div-format')
  } else {
    d.setAttribute('class', 'image-div-format')
  }
}

function addPill() {
  enableNextField(this)
  if (!document.getElementById('tagsInput').value.includes(',')) {
    return
  }
  const tags = document.getElementById('tagsInput').value
  console.log(document.getElementById('tagsInput').value)
  if (tags.includes(',')) {
    const tagsArray = tags.split(',')
    const tagsDiv = document.getElementById('tags-div')
    const pill = document.createElement('button')
    pill.classList.add('pill--purple')
    pill.setAttribute('type', 'button')
    pill.innerText = tagsArray[0]
    pill.innerHTML += '<span class="close"></span>'
    tagsDiv.appendChild(pill)
    pill.addEventListener('click', (e) => {
      const p = e.target.parentElement
      e.currentTarget.remove()
    })
    document.getElementById('tagsInput').value = ''
  }
}
function addLastPill() {
  if (document.getElementById('tagsInput').value.length == 0) {
    return
  }
  const tags = document.getElementById('tagsInput').value
  console.log(document.getElementById('tagsInput').value)
  const tagsDiv = document.getElementById('tags-div')
  const pill = document.createElement('button')
  pill.classList.add('pill--purple')
  pill.setAttribute('type', 'button')
  pill.innerText = tags
  pill.innerHTML += '<span class="close"></span>'
  tagsDiv.appendChild(pill)
  pill.addEventListener('click', (e) => {
    const p = e.target.parentElement
    e.currentTarget.remove()
  })
  document.getElementById('tagsInput').value = ''
}

function clearForm() {
  easyMDE.value('')
}

function validateForm() {
  const forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
}

async function submitForm(e) {
  console.log('submitting')
  const forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
    }, false)
  const title = document.getElementById('titleInput').value
  const description = document.getElementById('descriptionInput').value
  const headerImage = document.getElementById('headerFileInput').value
  const headerCaption = document.getElementById('captionInput').value
  const email = document.getElementById('emailInput').value
  const twitter = document.getElementById('twitterUsername').value
  const name = document.getElementById('nameInput').value
  const web = document.getElementById('webInput').value
  const tagsButtons = document.getElementById('tags-div').querySelectorAll('button')
  const tags = []
  tagsButtons.forEach((b) => {
    tags.push(b.innerText)
  })
  const avatarImage = document.getElementById('avatarFileInput').value
  const content = easyMDE.value()
  const data = {
    title: title,
    description: description,
    author_email: email,
    author_twitter: twitter,
    author_name: name,
    content: content,
    tags: tags,
    header_image: headerImage,
    image_caption: headerCaption,
    author_link: web,
    author_avatar: avatarImage,
  }
  console.log(data)
  fetch(server + ':9494/submitStory', { mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function checkCOC() {
  coc = !coc
  console.log(coc)
  if (coc) {
    document.getElementById('submitButton').removeAttribute('disabled')
  } else {
    document.getElementById('submitButton').setAttribute('disabled', 'disabled')
  }
}
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission

})()
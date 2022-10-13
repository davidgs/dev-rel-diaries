
// Tooltips -- don't work, look into why
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// have they agreed to the quoteCoC yet?
let quoteCoC = false
const quoteHeader = 'header'
const quotePost = 'post'
const quoteAvatar = 'avatar'

const quoteServer = 'https://devreldiaries.com'
// Set up the Markdown editor
const quoteMDE = new EasyMDE({
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
  element: document.getElementById('mde-quote-input'),
})
quoteMDE.value('') // clear the editor

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
  if (imageType === quoteHeader) {
    f = document.getElementById('headerFileInput').files[0]
    document.getElementById('headerFileInput').disabled = true
  } else if (imageType === quotePost) {
    f = document.getElementById('postFileInput').files[0]
  } else if (imageType === quoteAvatar) {
    f = document.getElementById('avatarFileInput').files[0]
    document.getElementById('avatarFileInput').disabled = true
  }
  if (!f.type === 'image/jpeg' || !f.type === 'image/png' || !f.type === 'image/gif' ) {
    if (imageType === quoteHeader) {
      document.getElementById('headerFileInput').value = ''
    } else if (imageType === quotePost) {
      document.getElementById('postFileInput').value = ''
    } else if (imageType === quoteAvatar) {
      document.getElementById('avatarFileInput').value = ''
    }
    return alert('Only image files of type .png, .jpg, .jpeg or .gif are acceptable. Please upload a valid image file.')
  }
  console.log('setImage: ' + f)
  const quoteReader = new FileReader()
  quoteReader.readAsDataURL(f)
  quoteReader.onload = function () {
  var quoteImgName = f.name
    if (imageType === quoteHeader) {
      quoteImgName = 'header-' + quoteImgName
    } else if (imageType === quotePost) {
      quoteImgName = 'post-' + quoteImgName
    } else if (imageType === quoteAvatar) {
      quoteImgName = 'avatar-' + quoteImgName
    }
    const data = {
      type: 'quote-image',
      name: quoteImgName,
      image: `${quoteReader.result}`,
      title: document.getElementById('nameInput').value,
    }
    var imgData = `${quoteReader.result}`
    console.log(imgData)
    fetch(quoteServer + ':9494/submitImage', {
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
          if (imageType === quoteHeader) {
            const cl = document.getElementById('headerFileInput')
            cl.value = ''
          } else if (imageType === quotePost) {
            const cl = document.getElementById('postFileInput')
            cl.value = ''
          } else if (imageType === quoteAvatar) {
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
  if (imageType === quoteHeader) {
    imageDiv = document.getElementById('header-image')
  } else if (imageType === quotePost) {
    imageDiv = document.getElementById('post-image')
    cl = document.getElementById('postFileInput')
    cl.value = ''
  } else if (imageType === quoteAvatar) {
    imageDiv = document.getElementById('avatar-image')
  }
  const imageDivDiv = document.createElement('div')
  imageDiv.appendChild(imageDivDiv)
  if (imageType === quoteHeader) {
    imageDivDiv.setAttribute('class', 'header-image-div-format')
  } else {
    imageDivDiv.setAttribute('class', 'upload-image')
  }
  imageDivDiv.setAttribute('id', quoteServer + '/dev-rel-diaries-server/' + location)
  imageDivDiv.setAttribute('location', location)
  const closeButton = document.createElement('button')
  closeButton.setAttribute('type', 'button')
  if (imageType === quoteHeader || imageType === quoteAvatar) {
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
      var val = quoteMDE.value()
      val = val.replace(findMe, '')
      quoteMDE.value(val)
    }
    pNode.remove()
    // remove the image from the server
    fetch(quoteServer + ':9494/delImage', {
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
        var val = quoteMDE.value()
        console.log(val)
        console.log(val.length)
        val += ' ![image](' + pNode.id + ') '
        quoteMDE.value(val)
      } else {
        const findMe = ' ![image](' + pNode.id + ') '
        var val = quoteMDE.value()
        val = val.replace(findMe, '')
        quoteMDE.value(val)
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

function clearForm() {
  quoteMDE.value('')
}
async function submitForm(e) {
  console.log('submitting')
  const forms = document.querySelectorAll('.needs-validation')
  const data = {
    author_email: document.getElementById('emailInput').value,
    author_twitter: document.getElementById('twitterUsername').value,
    author_name: document.getElementById('nameInput').value,
    content: quoteMDE.value(),
    author_link: document.getElementById('webInput').value,
    author_title: document.getElementById('descriptionInput').value,
    author_avatar: document.getElementById('avatarFileInput').value,
  }
  console.log(data)
  fetch(quoteServer + ':9494/submitQuote', { mode: 'cors', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.error('Error:', error)
    })
}

function checkCOC() {
  quoteCoC = !quoteCoC
  console.log(quoteCoC)
  if (quoteCoC) {
    document.getElementById('submitButton').removeAttribute('disabled')
  } else {
    document.getElementById('submitButton').setAttribute('disabled', 'disabled')
  }
}

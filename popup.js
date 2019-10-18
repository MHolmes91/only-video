const onlyVideo = document.getElementById('only-video');
const input = document.getElementById('input')

const setButtonColorFromSettings = () => {
  chrome.storage.sync.get('color', function (data) {
    onlyVideo.style.backgroundColor = data.color
    onlyVideo.setAttribute('value', data.color)
  })
}

onlyVideo.addEventListener('click', () => {
  console.log('clicked')
  const val = input.value
  if (val) {
    chrome.storage.sync.set({ 'color': val }, () => {
      setButtonColorFromSettings()
    })
  }

  chrome.tabs.query({ active: true, currentWindow: true}, tabs => {
    console.log('got tabs')
    chrome.tabs.executeScript(
      tabs[0].id,
      {code: `
        (() => {
          console.log('attempting to make the page video only')
          const body = document.querySelector('body')
          const video = document.querySelector('video')
          if(video) {
            console.log('video only!')
            video.setAttribute('controls', true)
            body.innerHTML = ''
            body.appendChild(video)
          }
        })()
      `}
    )
  })
})

setButtonColorFromSettings()

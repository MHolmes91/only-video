const onlyVideoLog = s => console.log(`[only video] ${s}`)

chrome.browserAction.onClicked.addListener(() => {
    onlyVideoLog('clicked a tab')
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const currentTabId = tabs[0].id
        onlyVideoLog('got tabs')
        chrome.tabs.executeScript(currentTabId, { file: './foreground.js' }, () => onlyVideoLog('inserted js'))
        chrome.tabs.insertCSS(currentTabId, {
            file: './only-video.css',
        }, () => onlyVideoLog('inserted css'))
    })
})
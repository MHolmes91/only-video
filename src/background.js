const onlyVideoLog = s => console.log(`[only video] ${s}`);

chrome.action.onClicked.addListener(async tab => {
    onlyVideoLog('clicked a tab');
    const currentTabId = tab.id;
    try {
        await chrome.scripting.executeScript({
            target: { tabId: currentTabId },
            files: ['foreground.js'],
        });
        onlyVideoLog('inserted js');
        await chrome.scripting.insertCSS({
            target: { tabId: currentTabId },
            files: ['only-video.css'],
        });
        onlyVideoLog('inserted css');
    } catch (e) {
        onlyVideoLog(`error: ${e}`);
    }
});

const onlyVideoLog = (s: string): void => console.log(`[only video] ${s}`);

chrome.action.onClicked.addListener(async (tab: chrome.tabs.Tab) => {
    onlyVideoLog('clicked a tab');
    const currentTabId = tab.id;
    if (currentTabId === undefined) {
        onlyVideoLog('no tab id');
        return;
    }
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
        const message = e instanceof Error ? e.message : String(e);
        onlyVideoLog(`error: ${message}`);
    }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color: '#cc88cc' }, () => {
    console.log('This is purp')
  })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    console.log('wat')
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'developer.chrome.com' },
      }),
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'mlb66.ir' },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})
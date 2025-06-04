global.chrome = {
  action: { onClicked: { addListener: jest.fn() } },
  scripting: {
    executeScript: jest.fn().mockResolvedValue(),
    insertCSS: jest.fn().mockResolvedValue(),
  },
};

beforeAll(async () => {
  await import('./background.js');
});

describe('background onClicked', () => {
  test('injects foreground script and css', async () => {
    const handler = chrome.action.onClicked.addListener.mock.calls[0][0];
    await handler({ id: 1 });
    expect(chrome.scripting.executeScript).toHaveBeenCalledWith({
      target: { tabId: 1 },
      files: ['foreground.js'],
    });
    expect(chrome.scripting.insertCSS).toHaveBeenCalledWith({
      target: { tabId: 1 },
      files: ['only-video.css'],
    });
  });
});

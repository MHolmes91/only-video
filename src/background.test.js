global.chrome = {
  action: { onClicked: { addListener: jest.fn() } },
  scripting: {
    executeScript: jest.fn().mockResolvedValue(),
    insertCSS: jest.fn().mockResolvedValue(),
  },
  i18n: { getMessage: jest.fn().mockReturnValue('no videos') },
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

describe('foreground multiple videos', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.resetModules();
  });

  test('handles multiple videos', async () => {
    document.body.innerHTML = '<video id="v1"></video><video id="v2"></video>';
    await import('./foreground.js');
    const gallery = document.querySelector('.only-video-gallery');
    expect(gallery).not.toBeNull();
    expect(gallery.querySelectorAll('video').length).toBe(2);
  });

  test('focuses on single video when clicked', async () => {
    document.body.innerHTML = '<video id="v1"></video><video id="v2"></video>';
    await import('./foreground.js');
    const video = document.getElementById('v1');
    video.click();
    const single = document.querySelector('.only-video-single-container');
    expect(single).not.toBeNull();
    expect(single.querySelectorAll('video').length).toBe(1);
    expect(document.querySelector('.only-video-gallery')).toBeNull();
  });
});

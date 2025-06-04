jest.useFakeTimers();

global.chrome = {
  i18n: { getMessage: jest.fn().mockReturnValue('no videos') }
};

describe('foreground script', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllTimers();
    jest.resetModules();
  });

  test('handles single video', async () => {
    document.body.innerHTML = '<video></video>';
    await import('./foreground.js');
    const container = document.querySelector('.only-video-single-container');
    expect(container).not.toBeNull();
    expect(container.querySelector('video')).not.toBeNull();
  });

  test('handles no videos', async () => {
    await import('./foreground.js');
    const notice = document.querySelector('.only-video-no-videos');
    expect(notice).not.toBeNull();
    jest.runAllTimers();
    expect(document.querySelector('.only-video-no-videos')).toBeNull();
  });
});

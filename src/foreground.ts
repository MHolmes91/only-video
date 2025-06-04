import { randomDirection, randomAlphaNumStr } from './utils';

(() => {
    const head = document.querySelector<HTMLHeadElement>('head');
    const onlyVideoLog = (s: string): void => console.log(`[only video] ${s}`);

    const createVideoSwoopAnimation = (video: HTMLVideoElement): void => {
        const animationName = randomAlphaNumStr();
        const randomHeight = randomDirection() * (Math.ceil(Math.random() * 100) + 100);
        const randomWidth = randomDirection() * (Math.ceil(Math.random() * 100) + 100);

        const css = `
            @keyframes ${animationName} {
                from {
                    left: ${randomWidth}vw;
                    top: ${randomHeight}vh;
                }

                to {
                    left: 0;
                    top: 0;
                }
            }
        `;

        const style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        head?.appendChild(style);

        video.style.animationName = animationName;
    };

    const setVideoStyling = (video: HTMLVideoElement): void => {
        video.removeAttribute('height');
        video.removeAttribute('width');
        video.removeAttribute('style');

        video.className = 'only-video-video';
        video.controls = true;
    };

    const setGalleryVideoStyling = (video: HTMLVideoElement): void => {
        video.removeAttribute('height');
        video.removeAttribute('width');
        video.removeAttribute('style');

        createVideoSwoopAnimation(video);
        video.className = 'only-video-video only-video-gallery-video';
        video.controls = true;
    };

    const onlyVideo = (theChosenOne: HTMLVideoElement): void => {
        setVideoStyling(theChosenOne);
        const container = document.createElement('div');
        container.setAttribute('class', 'only-video-single-container');
        container.appendChild(theChosenOne);
        body.innerHTML = '';
        body.appendChild(container);
    };

    const aSetOfVideos = (videos: NodeListOf<HTMLVideoElement>): void => {
        const container = document.createElement('div');
        container.setAttribute('class', 'only-video-container');

        const gallery = document.createElement('div');
        gallery.setAttribute('class', 'only-video-gallery');
        container.appendChild(gallery);

        videos.forEach(video => {
            setGalleryVideoStyling(video);
            video.muted = true;
            video.addEventListener('click', e => {
                onlyVideo(e.currentTarget as HTMLVideoElement);
            });
            gallery.appendChild(video);
        });
        body.innerHTML = '';
        body.appendChild(container);
    };

    onlyVideoLog('attempting to make the page video only');
    const body = document.querySelector<HTMLBodyElement>('body')!;
    const videos = document.querySelectorAll<HTMLVideoElement>('video');
    if (videos && videos.length) {
        // Use classList to avoid a leading "null" when the body has no class
        body.classList.add('only-video-body');
        onlyVideoLog('video only!');
        if (videos.length === 1) {
            onlyVideo(videos[0]);
        } else {
            onlyVideoLog('video set');
            aSetOfVideos(videos);
        }
    } else {
        onlyVideoLog('no videos');
        const noVideos = document.createElement('div');
        noVideos.setAttribute('class', 'only-video-no-videos');

        const noVideosMessage = document.createElement('div');
        noVideosMessage.setAttribute('class', 'only-video-no-videos-message');
        noVideosMessage.innerText = chrome.i18n.getMessage('noVideosFound');
        noVideos.appendChild(noVideosMessage);

        document.body.appendChild(noVideos);
        setTimeout(() => document.body.removeChild(noVideos), 1500);
    }
})();

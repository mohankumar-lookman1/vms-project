import React, { useEffect, useRef } from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';
import videoUrls from '../../Data/source.json';

const VideoPlayer = ({ streamKey }) => {
    const wrapper = useRef(null);

    useEffect(() => {
        const url = videoUrls[streamKey];
        const player = new JSMpeg.Player(url, {
            canvas: wrapper.current,
            autoplay: true,
            videoBufferSize: 512 * 1024,
            audioBufferSize: 128 * 1024,
            controls: true,
        });

     
    }, [streamKey]);

    return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0' }}>
            <canvas ref={wrapper} style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }} />
        </div>
    );
};

export default VideoPlayer;

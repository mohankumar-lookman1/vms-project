import React, { useEffect, useRef } from 'react';
import JSMpeg from '@cycjimmy/jsmpeg-player';

const VideoPlayer = ({ videoUrl }) => {
    const wrapper = useRef(null);

    useEffect(() => {
        if (videoUrl && typeof videoUrl === 'string') { // Add this condition
            new JSMpeg.Player(videoUrl, {
                canvas: wrapper.current,
                autoplay: true,
                videoBufferSize: 512 * 1024,
                audioBufferSize: 128 * 1024,
                controls: true,
            });
        }
    }, [videoUrl]);

    return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: '0' }}>
            <canvas ref={wrapper} style={{ position: 'absolute', width: '100%', height: '100%', top: '0', left: '0' }} />
        </div>
    );
};

export default VideoPlayer;
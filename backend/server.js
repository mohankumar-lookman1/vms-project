const express = require('express');
const http = require('http');
const request = require('request');
// const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.get('/0/stream/index.m3u8', (req, res) => {
    const sourceUrl = 'http://localhost:8083/stream/cam1/channel/0/hls/live/index.m3u8'; // Replace with your source HLS stream URL

    request.get(sourceUrl)
        .on('error', (error) => {
            console.error('Error fetching HLS stream:', error);
            res.status(500).end('Internal Server Error');
        })
        .pipe(res);
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
});
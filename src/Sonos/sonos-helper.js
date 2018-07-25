import secrets from './../secret'
const request = require('request');

const playEndpoint = "/kitchen/spotify/now/"
const queueEndpoint = "/kitchen/spotify/now/";

const sendTracks = (songs) => {
    const uri = "http://" + secrets.ip;

    request.get(uri + playEndpoint + songs[0], (error, response, body) => {
        console.log(body);
    });

    for (let i=0; i<songs.length-1; i++) {
        request.get(uri + queueEndpoint + songs[i+1], (error, response, body) => {
            console.log(body);
        });
    }
}

export default sendTracks;
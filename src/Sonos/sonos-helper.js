import secrets from './../secret'
const request = require('request');

const playEndpoint = "/kitchen/spotify/now/"
const queueEndpoint = "/kitchen/spotify/now/";

const sendTracks = (selected) => {
    const uri = "http://" + secrets.ip;

    request.get(uri + playEndpoint + selected[0].uri, (error, response, body) => {
        console.log(body);
    });

    for (let i=0; i<selected.length-1; i++) {
        request.get(uri + queueEndpoint + selected[i+1].uri, (error, response, body) => {
            console.log(body);
        });
    }
}

export default sendTracks;
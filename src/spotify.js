const request = require('request');
const querystring = require('querystring');
const code = require('./token.js')

var tracks = (query) => {
    let token = code.token;
    let results = [];

    let encodedQuery = {
        url: 'https://api.spotify.com/v1/search?'+
        querystring.stringify({
            q: query,
            type: 'artist'
        }),
        headers: {
            'Authorization': 'Bearer '+token
        },
        json: true
    }
    console.log(encodedQuery);
    request.get(encodedQuery, (error, response, body) => {

        let artists = body['artists']['items'];

        for (let i=0; i < artists.length; i++) {
            if (!error) {
                results.push(artists[i]['name'])
            }
        }   
        if (response['statusCode'] !== 200) {
            console.log('Not 200')
        }
    })

    //console.log(results)
    return results;
}

module.exports.tracks = tracks;
const request = require('request');
const querystring = require('querystring');

const token = process.env.SPOTIFY_TOKEN;

var tracks = (query) => {
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

        console.log(body);
        let artists = body['artists']['items'];

        for (let i=0; i < artists.length; i++) {
            if (!error) {
                results.push(artists[i]['name'])
            }
        }   
        console.log(response)
        if (response['statusCode'] !== 200) {
            console.log('Not 200')
        }
    })

    //console.log(results)
    return results;
}

module.exports.tracks = tracks;
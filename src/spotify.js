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
            type: 'track'
        }),
        headers: {
            'Authorization': 'Bearer '+token
        },
        json: true
    }

    request.get(encodedQuery, (error, response, body) => {

        let data = [];
        if (body['tracks']['items']) {
            data = body['tracks']['items'];
        }

        for (let i=0; i < data.length; i++) {
            if (!error) {
                results.push(data[i]['name'])
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
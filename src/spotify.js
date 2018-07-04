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

        // Don't even try and understand this.
        for (let i=0; i < data.length; i++) {
            if (!error) {
                results.push(data[i]['name'])
            }
            if (data[i]['artists']) {
                for (let j=0; j < data[i]['artists'].length; j++) {
                    results[i] += (' -- ' + data[i]['artists'][j]['name'])
                }
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
import token from './../token';
const request = require('request');
const querystring = require('querystring');

const findTracks = async (query) => {
    return new Promise((resolve, reject) => {
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
            if (response['statusCode'] !== 200) {
                reject('Invalid/No results');
                return;
            }

            let data = body['tracks']['items'] ? body['tracks']['items'] : [];
            let results = [];

            // Don't even try and understand this.
            for (let i=0; i < data.length; i++) {
                if (!error) {
                    results.push(data[i]['name'])
                }

                // Add artist name(s)
                if (data[i]['artists']) {
                    for (let j=0; j < data[i]['artists'].length; j++) {
                        results[i] += (' -- ' + data[i]['artists'][j]['name'])
                    }
                }

                // Add album name
                if (data[i]['album'])
                    results[i] += ` { ${data[i]['album']['name']} }`;
                }

            resolve(results);
            reject('Oof')
        });
    });
};

export default findTracks;
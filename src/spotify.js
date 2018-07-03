const request = require('request');
const querystring = require('querystring');

const token = 'BQAfXbzQMSsRf0Tf0xfPvtmns_AhWzWSnrgz1OGu78Mqxh9-1ADH37BAdET3754Hn2KEhsMC8vXA35Q3SDkzk0W_HviDaOY-NQfp7T_n69op991aY51ig2YBd03-FsN8hrQZhoCZGPBWRsV9hbc9GvJhR72tgQKJE9o';

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
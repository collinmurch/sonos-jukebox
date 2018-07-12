import React, { Component } from 'react';
import findTracks from './../Spotify/spotify-helper';
import Card from './../Spotify/Card';

class Search extends Component {
    state = {
        input: '',
        results: [],
        images: [],
        uris: []
    }

    inputHandler = (e) => {
        let input = e.target.value;

        // Must set input state before everything else, otherwise lag
        this.setState({input})

        findTracks(input).then((response) => {
            this.setState({results: response.results,
                           uris:    response.uris,
                           images:  response.images});
        }).catch((e) => {
            console.log(e);
            this.setState({results: [],
                           uris:    [],
                           images:  []});
        });
    };

    retrieveTrack = (i) => {
        console.log(this.state.uris[i]);
    }

    cardHandler = (item, i) => {
        return (
            <Card key={i} 
            click={this.retrieveTrack.bind(this, i)}
            image={this.state.images[i]}>
                {item}
            </Card>
        );
    }

    render() {
        const inputStyle = {
            width: '50%',
        };

        return (
            <div className="search_box"
            style={{textAlign: 'center'}}>
                <input type="text" 
                onChange={this.inputHandler} 
                value={this.state.input}
                style={inputStyle} />

                <div className="card_results">
                    {this.state.results.map(this.cardHandler)}
                </div>
            </div>
        ); 
    }
}

export default Search;
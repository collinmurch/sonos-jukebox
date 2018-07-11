import React, { Component } from 'react';
import findTracks from './../Spotify/spotify-helper';
import Card from './../Spotify/Card';

class Search extends Component {
    state = {
        input: '',
        results: [],
        uris: []
    }

    inputHandler = (e) => {
        let input = e.target.value;

        // Must set input state before everything else, otherwise lag
        this.setState({input})

        findTracks(input).then((response) => {
            this.setState({results: response.results,
                           uris:    response.uris});
        }).catch((e) => {
            console.log(e);
            this.setState({results: [],
                           uris:    []});
        });
    };

    retrieveTrack = (i) => {
        console.log(this.state.uris[i]);
    }

    cardHandler = (item, i) => {
        return (
            <Card key={i} 
            click={this.retrieveTrack.bind(this, i)}>
                {item}
            </Card>
        );
    }

    render() {
        return (
            <div className="search_box">
                <input type="text" 
                onChange={this.inputHandler} 
                value={this.state.input}/>

                <div className="card_results">
                    {this.state.results.map(this.cardHandler)}
                </div>
            </div>
        ); 
    }
}

export default Search;
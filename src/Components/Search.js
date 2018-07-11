import React, { Component } from 'react';
import findTracks from './../Spotify/spotify-helper';
import Card from './../Spotify/Card';

class Search extends Component {
    state = {
        input: '',
        results: []
    }

    inputHandler = (e) => {
        let input = e.target.value;

        this.setState({input})

        findTracks(input).then((results) => {
            this.setState({results});
        }).catch((e) => {
            console.log(e);
            this.setState({results: []});
        });
    };

    cardHandler = (item, i) => {
        return (
            <Card key={i}>
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
import React, { Component } from 'react';
import findTracks from './../spotify'

class Search extends Component {
    state = {
        input: '',
        results: []
    }

    inputHandler = (e) => {
        let input = e.target.value;

        this.setState({input})

        let results = findTracks(input).then((results) => {
            this.setState({results});
        }).catch((e) => {
            console.log(e);
            this.setState({results: []});
        });
    };

    autocompleteHandler = (item, i) => {
        return (
            <p key={i}>
            {item}
            </p>
        );
    }

    render() {
        return (
            <div className="search_box">
                <input type="text" 
                onChange={this.inputHandler} 
                value={this.state.input}/>

                <div className="autocomplete">
                    {this.state.results.map(this.autocompleteHandler)}
                </div>
            </div>
        ); 
    }
}

export default Search;
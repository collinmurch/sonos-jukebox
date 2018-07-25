import React, { Component } from 'react';
import findTracks from './../Spotify/spotify-helper';
import sendTracks from './../Sonos/sonos-helper'
import Card from './../Spotify/Card';

class Search extends Component {
    state = {
        input: "",
        contents: [],
        images: [],
        uris: [],
        selected: {
            contents: [],
            images: [],
            uris: []
        }   
    }

    inputHandler = (e) => {
        let input = e.target.value;

        // Must set input state before everything else, otherwise lag
        this.setState({input})

        findTracks(input).then((response) => {
            this.setState({contents: response.results,
                           uris:    response.uris,
                           images:  response.images});
        }).catch((e) => {
            console.log(e);
            this.setState({contents: [],
                           uris:    [],
                           images:  []});
        });
    };

    cardClick = (i) => {

        // I know this is a lazy way to do things
        let selected = this.state.selected;

        if (selected.contents.length < 3) {
            selected.contents.push(this.state.contents[i]);
            selected.images.push(this.state.images[i]);
            selected.uris.push(this.state.uris[i]);

            this.setState({selected});
        }
    }

    removeCard = (i) => {
        let selected = this.state.selected;

        let bounds = i > 0 ? i : 1

        selected.contents.splice(i, bounds);
        selected.images.splice(i, bounds);
        selected.uris.splice(i, bounds);
        
        this.setState({selected});
    }

    cardHandler = (item, i) => {
        return (
            <Card key={i} 
            click={this.cardClick.bind(this, i)}
            image={this.state.images[i]}>
                {item}
            </Card>
        );
    }

    selectedCardHandler = (item, i) => {
        return (
            <Card key={"selected"+i} 
            image={this.state.selected.images[i]}
            click={this.removeCard.bind(this, i)}>
                {item}
            </Card>
        );
    }

    goHandler = () => {
        // console.log(
        //     this.state.selected.uris.map((item) => {
        //     return item;
        // }));

        sendTracks(this.state.selected.uris.map((item) => {return item;}));
    }

    render() {
        const inputStyle = {
            width: '50%',
        };

        return (
            <div className="search_component">
                <div className="selected_items">
                    {this.state.selected.contents.map(this.selectedCardHandler)}
                </div>
                <div className="search_box"
                style={{textAlign: 'center'}}>
                    <input type="text" 
                    onChange={this.inputHandler} 
                    value={this.state.input}
                    style={inputStyle} />

                    <button type="button"
                    onClick={this.goHandler}>
                    Go</button>

                    <div className="card_results">
                        {this.state.contents.map(this.cardHandler)}
                    </div>
                </div>
            </div>
        ); 
    }
}

export default Search;
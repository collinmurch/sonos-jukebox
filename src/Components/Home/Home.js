import React, { Component } from 'react';

import sonos from './../../Sonos/sonos-helper';

class Home extends Component {
    state = {
        imageURI: ''
    }

    componentDidMount() {
        sonos.getState().then((response) => {
            const state = JSON.parse(response);
            
            this.setState({imageURI: state['currentTrack']['albumArtUri']});
        }).catch((error) => {
            console.log("getState failed.")
        });
    }

    imageHandler = () => {

    }

    render () {
        return (
            <div className="Home">
                <img src={this.state.imageURI} 
                    alt="artwork"/>
            </div>
        );
    }
}

export default Home;
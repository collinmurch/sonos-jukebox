import React, { Component } from 'react';

import sonos from './../../Sonos/sonos-helper';
import './Home.css';

class Home extends Component {
    state = {
        imageURI: ''
    }

    componentDidMount() {
        sonos.getState().then((response) => {
            const state = JSON.parse(response);
            
            this.setState({imageURI: state['currentTrack']['albumArtUri']});
        }).catch((error) => {
            console.log(error)
        });
    }

    imageHandler = () => {

    }

    render () {
        return (
            <div className="home_component">
                <div className="current_song">
                    <img src={this.state.imageURI} 
                        alt='album artwork'
                        class="artwork"/>
                </div>
            </div>
        );
    }
}

export default Home;
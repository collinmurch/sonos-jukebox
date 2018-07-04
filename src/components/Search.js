import React, { Component } from 'react';

const spotify = require('../spotify.js')

class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      matches: [],
      rowHighlighted: -1
    }
  }

  handleUserInput(e) {
    let input = e.target.value;


    let tracks = []
    if (input) {
      tracks = spotify.tracks(input.toLowerCase());
    }

    this.setState({
      userInput: input,
      matches: tracks
    })
  }

  handleKeyPress(e) {
    let row = this.state.rowHighlighted;

    if (e.key === 'ArrowUp' && row > -1) {
      row--;
    }
    if (e.key === 'ArrowDown' && row < this.state.matches.length - 1) {
      row++;
    }
    if (e.key === 'Enter') {
      return this.selectAutocomplete(row);
    }

    this.setState({rowHighlighted: row});
  }

  setRowHighlighted(i) {
    this.setState({
      rowHighlighted: i
    })
  }

  selectAutocomplete(i) {
    this.setState({
      userInput: this.state.matches[i],
      matches: []
    })
  }

  render() {
    return (
      <div className="search">
        <div className='search_box'>
          <div className='search_bar'>
            <input value={this.state.userInput} onChange={(e) => this.handleUserInput(e)} onKeyUp={(e) => this.handleKeyPress(e)} />
            <div className='autocomplete_suggestions'>
              {
                this.state.matches.map( (item, i) => {
                  let background = this.state.rowHighlighted === i ? '#ccc' : '#fff';
                  return <p key={i} className='autocomplete_suggestions_item' 
                  onClick={() => this.selectAutocomplete(i) } style={{background: background}}
                  onMouseOver={() => this.setRowHighlighted(i)} >
                  {item}
                  </p>
                })
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}


export default Search;
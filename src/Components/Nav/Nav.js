import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './Nav.css';

import Search from './../Search/Search'

class Nav extends Component {

    render() {
        return (
            <div className="App">
                <div className="nav_component">
                    <header>
                        <nav>
                            <ul>
                                <li><a href="/">Home</a></li>
                                <li><a href="/search">Search</a></li>
                            </ul>
                        </nav>
                    </header>
                </div>

                <Route path="/" exact component={() => <h1>To Do...</h1>} />
                <Route path="/search" exact component={Search} />
            </div>
        );
    }
}

export default Nav;
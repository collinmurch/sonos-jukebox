import React, { Component } from 'react';
import './Nav.css';

class Nav extends Component {

    render() {
        return (
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
        );
    }
}

export default Nav;
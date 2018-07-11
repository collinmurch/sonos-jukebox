import React from 'react';

const card = (props) => {
    return (
        <div className="Card">
            <p className="card_item">
                {props.children}
            </p>
        </div>
    );
}

export default card;
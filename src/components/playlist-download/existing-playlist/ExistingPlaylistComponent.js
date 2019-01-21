import React, {Component} from 'react';
import {Link} from "react-router";

class ExistingPlaylistComponent extends Component {

    render() {
        return (
            <div>
                Existing Playlist Component
                {"\n"}
                <Link to={"/"}>Main Menu</Link>
            </div>
        );
    }
}


export default ExistingPlaylistComponent;
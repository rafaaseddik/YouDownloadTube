import React, {PureComponent} from 'react';
import {Link} from "react-router";

class CustomPlaylistComponent extends PureComponent {

    render() {
        return (
            <div>
                Custom Playlist Component
                <br/>
                <Link to={"/"}>Main Menu</Link>
            </div>
        );
    }
}


export default CustomPlaylistComponent;
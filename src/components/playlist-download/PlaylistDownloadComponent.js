import React, {Component} from 'react';
import {Link} from 'react-router';
class PlaylistDownloadComponent extends Component {
    render() {
        return (
            <div>
                <Link to={"/playlist/custom-playlist"}>Custom Playlist</Link>
                <br/>
                <Link to={"/playlist/existing-playlist"}>Existing Playlist</Link>
                <br/>
                <Link to={"/"}>Main Menu</Link>
            </div>
        );
    }
}

export default PlaylistDownloadComponent;
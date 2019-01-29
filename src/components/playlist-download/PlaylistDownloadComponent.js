import React, {Component} from 'react';
import {Link} from 'react-router';

class PlaylistDownloadComponent extends Component {
    render() {
        return (


            <div className={"container menu-container"}>
                <div className={"row"}>
                    <div className={"col-8 offset-2"}>
                        <h4>Download a Playlist</h4>
                    </div>
                    <div className={"col-6 offset-3"}><Link to="/playlist/custom-playlist">
                        <button className="btn btn-outline-light btn-block btn-menu no-border-radius">Custom Playlist
                        </button>
                    </Link></div>
                    <div className={"col-6 offset-3"}><Link to="/playlist/existing-playlist">
                        <button className="btn btn-outline-light btn-block btn-menu no-border-radius">Existing
                            Playlist
                        </button>
                    </Link></div>
                    <div className={"col-6 offset-3"}><Link to="/">
                        <button className="btn btn-outline-light btn-block btn-menu no-border-radius">Main Menu</button>
                    </Link></div>

                </div>
            </div>


        );
    }
}

export default PlaylistDownloadComponent;
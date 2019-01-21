import React, {Component} from 'react';
import './App.scss';
import {Router, Route,hashHistory} from 'react-router'
import MainMenu from "./components/main-menu/MainMenu";
import AboutComponent from "./components/about/AboutComponent";
import HeaderComponent from "./components/header/HeaderComponent"
import SingleSongDownloadComponent from "./components/single-song-download/SingleSongDownloadComponent";
import PlaylistDownloadComponent from "./components/playlist-download/PlaylistDownloadComponent";
import CustomPlaylistComponent from "./components/playlist-download/custom-playlist/CustomPlaylistComponent";
import ExistingPlaylistComponent from "./components/playlist-download/existing-playlist/ExistingPlaylistComponent";


class App extends Component {
    render() {
        return (
            <div className="App">
                <HeaderComponent/>
                <Router history={hashHistory}>
                    <Route path='/' component={MainMenu}/>
                    <Route path='/single/single-song-download' component={SingleSongDownloadComponent}/>
                    <Route path='/playlist/playlist-download' component={PlaylistDownloadComponent}/>
                    <Route path='/playlist/custom-playlist' component={CustomPlaylistComponent}/>
                    <Route path='/playlist/existing-playlist"' component={ExistingPlaylistComponent}/>
                    <Route path='/about' component={AboutComponent}/>
                </Router>
            </div>
        );
    }
}

export default App;

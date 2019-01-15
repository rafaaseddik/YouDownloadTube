import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router'
import MainMenu from "./components/main-menu/MainMenu";
import AboutComponent from "./components/about/AboutComponent";
import HeaderComponent from "./components/header/HeaderComponent"


class App extends Component {
    render() {
        return (
            <div className="App">
                <HeaderComponent/>
                <Router history={hashHistory}>
                    <Route path='/' component={MainMenu}/>
                    <Route path='/about' component={AboutComponent}/>
                </Router>
            </div>
        );
    }
}

export default App;

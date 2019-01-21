import React,{Component} from 'react';
import {Link} from 'react-router'
import './MainMenu.scss'
class MainMenu extends Component{
    constructor(props){
        super(props);
        this.window = window.require("electron").remote.getCurrentWindow();
        this.dialog = window.require("electron").remote.dialog;
    }
    handleExit(){
        this.dialog.showMessageBox({
            title:"YouDownloadTube - Exiting",
            message:"Are you sure you want to exit this cool application ?",
            buttons:[
                "Yes","No"
            ]
        },
            (buttonIndex,checkbox)=>{
                if(buttonIndex===0){
                    this.window.close();
                }
            });
    }
    render(){
        return (
            <div className={"container menu-container"}>
                <div className={"row"}>
                    <div className={"col-8 offset-2"}>
                        <h4>YouDownloadTube</h4>
                        <h6>Version 0.1.0</h6>
                    </div>
                    <div className={"col-6 offset-3"}><Link to="/single/single-song-download">
                        <button className="btn btn-outline-light btn-block btn-menu no-border-radius">Download a song</button></Link></div>
                    <div className={"col-6 offset-3"}><Link to="/playlist/playlist-download">
                        <button className="btn btn-outline-light btn-block btn-menu no-border-radius">Download a playlist</button></Link></div>
                    <div className={"col-6 offset-3"}><Link to='/about'>
                        <button className="btn btn-outline-light btn-block btn-menu no-border-radius">About</button></Link></div>
                    <div className={"col-6 offset-3"} onClick={()=>this.handleExit()}>
                        <button className="btn btn-outline-light btn-block btn-menu no-border-radius">Exit</button></div>
                </div>
            </div>
        )
    }
}
export default MainMenu;
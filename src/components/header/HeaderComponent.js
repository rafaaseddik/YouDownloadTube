import React,{Component} from 'react';
import './Header.scss'

class HeaderComponent extends Component{
    constructor(props){
        super(props);
        this.window = window.require("electron").remote.getCurrentWindow();
        this.dialog = window.require("electron").remote.dialog;
    }
    handleMinimize(){
        this.window.minimize();
    }
    handleMaximize(){
        if(this.window.isMaximized())
            this.window.unmaximize();
        else
            this.window.maximize();
    }
    handleClose(){
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
            <div className={"container-fluid"}>
                <div className={"header-bar row"}>
                    <div className={"col-8 text-left header-title"}>
                        YouDownloadTube
                    </div>
                    <div className={"col-4 text-right no-padding"}>
                        <button className={"btn header-btn"} onClick={()=>this.handleMinimize()}>-</button>

                        <button className={"btn header-btn header-btn-close"} onClick={()=>this.handleClose()}>x</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default HeaderComponent;
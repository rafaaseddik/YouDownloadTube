import React,{Component} from 'react';
import './Header.scss'
import logo from '../../assets/img/logo.png'

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
                    <div className={"col-4 text-left no-padding"}>
                        <img className={"header-logo"} src={logo} alt={"Application logo"} />
                    </div>
                    <div className={"col-4 text-center no-padding header-title"}>
                        YouDownloadTube
                    </div>
                    <div className={"col-4 text-right no-padding"}>
                        <button className={"btn header-btn"} onClick={()=>this.handleMinimize()}>-</button>
                        <button className={"btn header-btn"} onClick={()=>this.handleMaximize()}>
                            o
                        </button>
                        <button className={"btn header-btn header-btn-close"} onClick={()=>this.handleClose()}>x</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default HeaderComponent;
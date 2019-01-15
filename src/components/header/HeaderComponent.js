import React,{Component} from 'react';
import './Header.scss'


class HeaderComponent extends Component{
    constructor(props){
        super(props);
        this.window = window.require("electron").remote.getCurrentWindow();
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
        this.window.close()
    }
    render(){
        return (
            <div className={"container-fluid"}>
                <div className={"header-bar row"}>
                    <div className={"col-4 text-left no-padding"}>
                    </div>
                    <div className={"col-4 text-center no-padding"}>
                        YouDownloadTube
                    </div>
                    <div className={"col-4 text-right no-padding"}>
                        <button className={"btn header-btn"} onClick={()=>this.handleMinimize()}>-</button>
                        <button className={"btn header-btn"} onClick={()=>this.handleMaximize()}>
                            <i className={"far fa-window-restore"}></i>
                        </button>
                        <button className={"btn header-btn header-btn-close"} onClick={()=>this.handleClose()}>x</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default HeaderComponent;
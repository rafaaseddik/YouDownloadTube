import React,{Component} from 'react';
import {Link} from 'react-router'
class MainMenu extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <ul>
                    <li>Home</li>
                    <li><Link to='/about'>About</Link></li>
                    <li>Settings</li>
                    <li>Exit</li>
                </ul>
            </div>
        )
    }
}
export default MainMenu;
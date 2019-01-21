import React,{Component} from 'react'
import {Link} from 'react-router'
class AboutComponent extends Component{
    render(){
        return (
            <div>
                This is an about page
                <br/>
                <Link to={'/'}>
                    Go Home
                </Link>
            </div>
        )
    }
}

export default AboutComponent;
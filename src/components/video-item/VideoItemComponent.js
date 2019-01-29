import React, {Component} from 'react';
import './VideoItemComponent.scss'
import VideoInfo from "../../model/VideoInfo";

class VideoItemComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
    }

    render() {
        if (this.props.loadingVideoInfo)
            return (
                <div>
                    Loading Video Info, please wait...
                </div>
            );
        else
            return (
                <div className={"col-12 video-item"}>
                    <div className="background-overlay" style={{right:100-this.props.pourcentage+"%"}}></div>
                    <div className={"row"}>
                        <div className={"col-5 no-padding-left"}>
                            <img className="img-fluid" src={this.props.thumbnailUrl} alt={"Video Thumbnail"}/>
                        </div>
                        <div className={"col-7 text-left no-padding-left"}>
                            <h3 className={"video-title"}>{this.props.title}</h3>
                            <h4 className={"video-length"}>Length
                                : {this.props.length.minutes}:{this.props.length.seconds > 10 ? '' : '0'}{this.props.length.seconds}</h4>
                            <p className={"video-description"}>
                                {this.props.title.length > 40 ? this.props.description.toString().substring(0, 60) : this.props.description.toString().substring(0, 150)}...
                            </p>
                        </div>
                    </div>


                </div>
            );
    }
}

/*
VideoItemComponent.propTypes = {
    videoObj: VideoInfo
}*/
export default VideoItemComponent;
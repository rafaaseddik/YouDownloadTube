import React, {Component} from 'react';
import YoutubeDownloaderUtils from "../../../utils/YoutubeDownloaderUtils";
import {VideoFormat, VideoQuality} from "../../../model/VideoFormat";
import {ProgressInfoTypes} from "../../../model/ProgessInfo";
import VideoItemComponent from "../../video-item/VideoItemComponent";

const filenamify = require('filenamify');

class SinglePlaylistItemComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl:null,
            download: false,
            percentage: 0,
            videoObj: null,
            filename: "",
            loadingVideoInfo: false,
            currentAction: "Pending..."
        }
    }

    removeItem() {
        this.props.deleteThisItem(this.props.url)
    }

    componentDidMount() {
        this.setState({
            loadingVideoInfo: true
        });
        YoutubeDownloaderUtils.getVideoBasicInfo(this.props.url).then(videoInfo => {
            this.setState({
                videoObj: videoInfo,
                filename: filenamify(videoInfo.title),
                loadingVideoInfo: false
            })
        })
    }

    componentDidUpdate() {
        if (!this.state.download && this.state.videoUrl!=this.props.url) {
            this.setState({
                videoUrl:this.props.url,
                loadingVideoInfo: true
            });

            YoutubeDownloaderUtils.getVideoBasicInfo(this.props.url).then(videoInfo => {
                this.setState({
                    videoObj: videoInfo,
                    filename: filenamify(videoInfo.title),
                    loadingVideoInfo: false
                })
            })
        }

        if (this.state.filename.length > 1 && !this.state.download && this.props.startDownload) {
            this.setState({
                download: true
            });
            this.downloadThisItem();
        }
    }

    downloadThisItem() {

        let outputPath = this.props.downloadPath + "/" + this.state.filename;
        this.setState({
            currentAction: "1/3 - Initializing download..."
        });
        YoutubeDownloaderUtils.downloadVideoAsMp4(this.props.url, outputPath, VideoFormat.AUDIO_ONLY, VideoQuality.LOWESTAUDIO).subscribe(
            next => {
                switch (next.type) {
                    case ProgressInfoTypes.DOWNLOAD: {
                        this.setState({
                            currentAction: next.messageObject,
                            percentage: next.progress
                        });
                        break;
                    }
                    default:
                        break;
                }
            },
            error => {
            },
            (complete) => {
                YoutubeDownloaderUtils.convertMp4ToMp3(outputPath).subscribe(
                    (next) => {
                        this.setState({
                            currentAction: next.messageObject,
                            percentage: next.progress
                        });
                    }, (error) => {

                    }, (complete) => {
                        this.setState({
                            percentage: -1
                        });
                        YoutubeDownloaderUtils.removeTemporaryFile(outputPath + ".mp4");


                    })
            }
        );
    }

    render() {
        return (
            <div className={"row"}>
                <div className={"col-4 text-left"}>
                    <button className={"btn btn-candy btn-block"} onClick={() => this.removeItem()}
                            disabled={this.state.download}>Remove
                    </button>
                    <small>Status
                        : {this.state.currentAction}<br/> {this.state.percentage > 0 ? this.state.percentage + '%' : ''}
                    </small>
                </div>
                <div className={"col-8"}>
                    {
                        (this.state.videoObj != null || this.state.loadingVideoInfo) ? (<div>
                            <VideoItemComponent {...this.state.videoObj} loadingVideoInfo={this.state.loadingVideoInfo}
                                                pourcentage={this.state.percentage}/>
                        </div>) : ''
                    }
                </div>
            </div>
        );
    }
}

export default SinglePlaylistItemComponent;
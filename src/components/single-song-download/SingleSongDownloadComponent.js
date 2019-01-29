import React, {Component} from 'react';
import {Link} from 'react-router'
import YoutubeDownloaderUtils from '../../utils/YoutubeDownloaderUtils'
import {VideoFormat, VideoQuality} from "../../model/VideoFormat";
import {ProgressInfoTypes} from "../../model/ProgessInfo";
import VideoItemComponent from "../video-item/VideoItemComponent";
import '../shared-style.scss'

const filenamify = require('filenamify');
const {clipboard, shell} = window.require('electron');
const dialog = window.require('electron').remote.dialog;

class SingleSongDownloadComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videoUrl: "",
            downloadStarted: false,
            currentAction: "Please provide a youtube link to download",
            percentage: 0,
            videoObj: null,
            watchClipboard: true,
            filename: "",
            loadingVideoInfo: false
        };
    }

    handleChange(e) {
        this.setState({videoUrl: e.target.value});
        if (YoutubeDownloaderUtils.matchYoutubeUrl(e.target.value)) {
            this.setState({
                currentAction: "Looking for video info",
                loadingVideoInfo: true
            });
            YoutubeDownloaderUtils.getVideoBasicInfo(e.target.value).then(videoInfo => {
                this.setState({
                    videoObj: videoInfo,
                    filename: filenamify(videoInfo.title),
                    currentAction: `Click on "Download" to start downloading "${videoInfo.title}"`,
                    loadingVideoInfo: false
                })
            })
        }
    }

    handleWatchClipboardChange(e) {
        this.setState({
            watchClipboard: e.target.checked
        })
    }

    handleFocus() {
        if (this.state.watchClipboard) {
            let clipboardText = clipboard.readText();
            if (YoutubeDownloaderUtils.matchYoutubeUrl(clipboardText))
                this.handleChange({
                    target: {value: clipboardText}
                })
        }
    }

    handleSubmit() {
        let outputPath = dialog.showSaveDialog({
            defaultPath: this.state.filename
        });
        if (outputPath) {
            this.setState({
                currentAction: "1/3 - Initializing download..."
            });
            YoutubeDownloaderUtils.downloadVideoAsMp4(this.state.videoUrl, outputPath, VideoFormat.AUDIO_ONLY, VideoQuality.LOWESTAUDIO).subscribe(
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
                            shell.showItemInFolder(outputPath + ".mp3");

                        })
                }
            );
        }
    }


    render() {
        return (
            <div>
                <div className={"container-fluid"}>
                    <div className={"row component-header"}>
                        <div className={"col-2 no-padding"}>
                            <Link to={"/"}>
                                <button className={"btn btn-block no-border-radius btn-main-menu"}>Main Menu
                                </button>
                            </Link>
                        </div>
                        <div className={"col-10"}>
                            <h3>
                                Download MP3 from Youtube
                            </h3>
                        </div>
                    </div>
                </div>
                <div className={"container main-page"}>
                    <div className={"row form-elements"}>
                        <div className={"col-9"}>
                            <input className={"form-control input-field"} value={this.state.videoUrl}
                                   onChange={(e) => this.handleChange(e)}
                                   placeholder={"Insert your video's Youtube link here"}
                                   onFocus={() => this.handleFocus()}/>
                        </div>
                        <div className={"col-3 no-padding"}>
                            <button className={"btn btn-candy btn-block"}
                                    onClick={() => this.handleSubmit()}
                                    disabled={this.state.videoObj == null}>Download
                            </button>
                        </div>
                        <div className={"col-12 text-left"}>
                            <input className={"form-check-input no-negative-margin"} type={"checkbox"}
                                   checked={this.state.watchClipboard}
                                   onChange={(e) => this.handleWatchClipboardChange(e)}/>
                            Watch Clipboard for Youtube URLs
                        </div>
                    </div>
                    <div className="navbar fixed-bottom status-footer">
                        {this.state.currentAction} {this.state.percentage > 0 ? this.state.percentage + "%" : ''}
                    </div>


                    <br/>{
                    (this.state.videoObj != null || this.state.loadingVideoInfo) ? (<div>
                        <VideoItemComponent {...this.state.videoObj} loadingVideoInfo={this.state.loadingVideoInfo}
                                            pourcentage={this.state.percentage}/>
                    </div>) : ''
                }
                    <br/>

                </div>
            </div>
        );
    }
}

export default SingleSongDownloadComponent;
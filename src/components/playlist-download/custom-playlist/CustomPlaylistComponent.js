import React, {PureComponent} from 'react';
import {Link} from "react-router";
import YoutubeDownloaderUtils from "../../../utils/YoutubeDownloaderUtils";
import {VideoFormat, VideoQuality} from "../../../model/VideoFormat";
import {ProgressInfoTypes} from "../../../model/ProgessInfo";
import VideoItemComponent from "../../video-item/VideoItemComponent";
import '../../shared-style.scss'
import SinglePlaylistItemComponent from "../single-playlist-item/SinglePlaylistItemComponent";

const filenamify = require('filenamify');
const {clipboard, shell} = window.require('electron');
const dialog = window.require('electron').remote.dialog;

class CustomPlaylistComponent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            videoUrl: "",
            watchClipboard: true,
            downloadPath: "",
            loadingVideoInfo: false,
            currentLinkIsValid: false,
            videosList: new Set(),
            download: false,
            allUrl:new Set() // to get a unique unchangeable key for listing to prevent useless child reload
        };
    }

    handleChange(e) {
        this.setState({videoUrl: e.target.value});
        if (YoutubeDownloaderUtils.matchYoutubeUrl(e.target.value)) {
            this.setState({
                currentLinkIsValid: true
            });
        }
        else {
            this.setState({
                currentLinkIsValid: false
            });
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

    handleAddSubmit() {
        this.setState(prevState => ({
            videosList: new Set([...prevState.videosList, this.state.videoUrl]),
            allUrl: new Set([...prevState.allUrl, this.state.videoUrl])
        }))
        /*let outputPath = dialog.showSaveDialog({
            defaultPath: this.state.filename
        });
        this.setState({
            currentAction: "1/3 - Initializing download..."
        });
        YoutubeDownloaderUtils.downloadVideoAsMp4(this.state.videoUrl, outputPath, VideoFormat.AUDIO_ONLY, VideoQuality.LOWESTAUDIO).subscribe(
            next => {
                switch (next.type) {
                    case ProgressInfoTypes.VIDEO_INFO: {
                        this.setState({
                            videoObj: next.messageObject
                        })
                        break;
                    }
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
        );*/
    }

    handleDownloadSubmit() {
        let downloadPath = dialog.showOpenDialog({
            defaultPath: this.state.downloadPath,
            properties: ["openDirectory"]
        });
        if (downloadPath) {

            downloadPath = downloadPath[0]
            this.setState({
                downloadPath: downloadPath,
                download: true
            })
        }
    }

    removeChild(url) {
        console.log(url)
        this.setState(prevState => {
            return {videosList: new Set(Array.from(prevState.videosList).filter(currentUrl => currentUrl != url))}
        })
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
                                Custom Playlist Download
                            </h3>
                        </div>
                    </div>
                </div>
                <div className={"container main-page"}>
                    <div className={"row form-elements"}>
                        <div className={"col-6"}>
                            <input className={"form-control input-field"} value={this.state.videoUrl}
                                   onChange={(e) => this.handleChange(e)}
                                   placeholder={"Insert your video's Youtube link here"}
                                   onFocus={() => this.handleFocus()}/>
                        </div>
                        <div className={"col-2 no-padding"}>
                            <button className={"btn btn-candy btn-block"}
                                    onClick={() => this.handleAddSubmit()}
                                    disabled={this.state.download || !this.state.currentLinkIsValid || Array.from(this.state.videosList).includes(this.state.videoUrl)}>Add
                            </button>
                        </div>
                        <div className={"col-4 no-padding-right"}>
                            <button className={"btn btn-candy btn-block"}
                                    onClick={() => this.handleDownloadSubmit()}
                                    disabled={this.state.download || this.state.videosList.size == 0}>Download Playlist
                            </button>
                        </div>
                        <div className={"col-12 text-left"}>
                            <input className={"form-check-input no-negative-margin"} type={"checkbox"}
                                   checked={this.state.watchClipboard}
                                   onChange={(e) => this.handleWatchClipboardChange(e)}/>
                            Watch Clipboard for Youtube URLs
                        </div>
                    </div>


                    <br/>
                    <div className={"row list-items-container"}>
                        {
                            Array.from(this.state.videosList).map((currentUrl) => {
                                return (
                                    <div className={"col-12"} key={Array.from(this.state.allUrl).indexOf(currentUrl)}>
                                        <SinglePlaylistItemComponent url={currentUrl}
                                                                     deleteThisItem={(e) => this.removeChild(e)}
                                                                     startDownload={this.state.download}
                                                                     downloadPath={this.state.downloadPath}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <br/>

                </div>
            </div>
        );
    }
}


export default CustomPlaylistComponent;
//import * as path from 'path';
import {Observable} from 'rxjs';
import {VideoQuality, VideoFormat} from "../model/VideoFormat";
import {ProgressInfo, ProgressInfoTypes} from "../model/ProgessInfo";
import VideoInfo from "../model/VideoInfo";

const ffmpeg = window.require('fluent-ffmpeg');
const fs = window.require("fs");
const ytdl = window.require("ytdl-core");
const ffmpegBin = window.require("ffmpeg-binaries");

//const sanitize = window.require("sanitize-filename");

/**
 * Contains all methods needed to retrieve the video file from Youtube and convert it MP3
 */
class YoutubeDownloaderUtils {
    /**
     * Get the video's basic informations and return a VideoInfo Object
     * @param {string} url
     *      url: the video's url on Youtube
     * @return {VideoInfo}
     */
    static getVideoBasicInfo(url) {

        const ytdl = window.require("ytdl-core");
        return new Promise(((resolve, reject) => {
            console.log("searching basic info")
            ytdl.getBasicInfo(url).then((info) => {
                resolve(new VideoInfo(info))
            }).catch(error => console.error(error))
        }));
    }

    static matchYoutubeUrl(url) {
        var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
        return false;
    }

    /**
     * This method downloads a Youtube Video into the mentioned name
     * @param {string} url
     * @param {string} filename
     * @param {VideoFormat} format
     * @param {VideoQuality} quality
     *      url: The video's url on Youtube
     *      filename: Where to save the downloaded Mp4 file
     *      format: The format in which to download the video
     *      quality: The quality in which to download the video
     * @returns {Observable<any>}
     */
    static downloadVideoAsMp4(url, filename, format, quality = VideoQuality.HIGHEST) {
        // This method returns an observable
        return new Observable((observable) => {
            let progress = ytdl(url, {filter: format});

            // It sends the video info with its 'next()' callback
            progress.on("info", (info) => {
                observable.next(new ProgressInfo(ProgressInfoTypes.VIDEO_INFO, new VideoInfo(info), 0));
            });

            // It sends the current downloading progress percentage through its 'next()' callback
            progress.on('progress', (chunkSize, downloadedChunks, totalChunks) => {
                observable.next(new ProgressInfo(ProgressInfoTypes.DOWNLOAD, "2/3 - Downloading", Math.floor(100 * downloadedChunks / totalChunks)));
            });

            // It calls its 'complete()' callback when the download is completed
            progress.pipe(fs.createWriteStream(filename + ".mp4")).on('finish', () => {
                observable.complete();
            });

            // In case of error it calls the 'error()' callback
            progress.on('error', error => {
                observable.error(error);
            });
        })
    }

    static convertMp4ToMp3(filename) {
        return new Observable((observable) => {
            ffmpeg(filename + ".mp4")
                .setFfmpegPath(ffmpegBin)
                .format("mp3")
                .audioBitrate(256)
                .on("progress", (progress) => {
                    observable.next(new ProgressInfo(ProgressInfoTypes.CONVERSION, "3/3 - Converting to MP3", Math.floor(progress.percent)));
                })
                .output(fs.createWriteStream(`${filename}.mp3`))
                .on("end", () => {
                    observable.next(new ProgressInfo(ProgressInfoTypes.CONVERSION, `File Downloaded at : ${filename}.mp3`, 100));
                    observable.complete();
                }).run()
        })

    }

    static removeTemporaryFile(path) {
        fs.unlink(path, err => {
            if (err)
                console.error(err)
        });
    }
}


export default YoutubeDownloaderUtils;
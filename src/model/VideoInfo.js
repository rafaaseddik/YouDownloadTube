export default class VideoInfo {
    title;
    description;
    length = {
        minutes: 0,
        seconds: 0
    };
    thumbnailUrl;

    constructor(infoObj) {
        this.title = infoObj.title;
        this.description = infoObj.description;
        this.length.minutes = Math.floor(infoObj.length_seconds / 60);
        this.length.seconds = infoObj.length_seconds % 60;
        //this.thumbnailUrl = infoObj.thumbnail_url.split("default.jpg")[0] + "maxresdefault.jpg"
        this.thumbnailUrl = infoObj.thumbnail_url
    }
}
export const ProgressInfoTypes = Object.freeze({
    "DOWNLOAD":1,
    "CONVERSION":2,
    "VIDEO_INFO":3,
    "DEFAULT":-1
})
export class ProgressInfo{
    type = ProgressInfoTypes.DEFAULT;
    messageObject = {};
    progress = 0 ;
    constructor(type,messageObject,progress){
        this.type = type;
        this.messageObject = messageObject;
        this.progress = progress;
    }
}


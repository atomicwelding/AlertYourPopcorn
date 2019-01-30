// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                         AlertYourPopcorn  - by weld                         //
//              Check easily if your favorite streamer is online !             //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //

let state = false;
let TwitchInfos = { 
    api:'https://api.twitch.tv/',
    client_id:'y1x5jgzrxcoysvzq2kpxkcs1c733cv',
    channel:'GrabYourPopcorn',
    updateRate: (1/12)       // in minutes
}

~function updateStatus() {
    let req = new XMLHttpRequest();
    req.open('GET', TwitchInfos.api+'helix/streams?user_login='+TwitchInfos.channel);
    req.setRequestHeader('Client-ID', TwitchInfos.client_id);

    req.onload = function() {
        res = JSON.parse(this.response);
        if(res.data[0] && !state) {
            chrome.runtime.sendMessage('connected');
            new Notification('GrabYourPopcorn', {body:'She just starts a stream :D', icon:'resources/icon.png'});
            state = true;
        }
        else if(!res.data[0]) {
            chrome.runtime.sendMessage('disconnected')
            state = false;
        }
        else {
            chrome.runtime.sendMessage('connected');
        }
    }

    req.send();

    setTimeout(updateStatus, 1000*60*TwitchInfos.updateRate);
}();
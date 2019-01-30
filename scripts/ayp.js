// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
//                         AlertYourPopcorn  - by weld                         //
//              Check easily if your favorite streamer is online !             //
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = //
let state = '';
updateRate = 1/120;

chrome.runtime.onMessage.addListener(msg => {
    state = msg;
});

/* - - MAIN - - */
~function updateStatus() {
    if(state == 'connected')
        online();
    else if (state == 'disconnected')
        offline();

    setTimeout(updateStatus, 1000*60*updateRate);
}();

/* - - VIEW - - */
let offline = () => {
    document.body.style.backgroundColor = "Crimson";
    document.getElementById('status').innerHTML = 'GrabYourPopcorn is offline ):';
}

let online = () => {
    document.body.style.backgroundColor = "MediumSeaGreen";
    document.getElementById('status').innerHTML = 'GrabYourPopcorn is online :D';

    //let n = new Notification('GrabYourPopcorn', {body:'GYP starts a stream :D', icon:'resources/icon.png'});

}
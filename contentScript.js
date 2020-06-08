(() => {
  const debug = (msg) => console.debug(`[PU DUMP]: ${msg}`);
  const log = (msg) => console.log(`[PU DUMP]: ${msg}`);

  log("Initializing content script...");

  log("Listening for messages from injected console.log hook.");
  window.addEventListener("message", (event) => {
    debug("Message received:", JSON.stringify(event));
    chrome.runtime.sendMessage(event.data);
  });
})();

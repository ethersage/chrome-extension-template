(() => {
  const debug = (msg) => console.debug(`[PU DUMP]: ${msg}`);
  const log = (msg) => console.log(`[PU DUMP]: ${msg}`);
  let data;

  log("Loading...");

  chrome.runtime.onMessage.addListener((message) => {
    debug("Message received:", JSON.stringify(message));

    if (message.source === "pu-dump") {
      data = JSON.stringify(message.data);
      const size = data.length * 16;
      debug(`Dump complete: stored ${size} bytes.`);
    }
  });
  log("Listening for messages from content script.");

  chrome.browserAction.onClicked.addListener(() => {
    if (data && data.length) {
      const size = data.length * 16;
      debug(`Download requested: payload ${size} bytes.`);

      chrome.downloads.download({
        filename: "pu-dump.json",
        url: `data:application/json,${data}`,
      });
    } else {
      log(
        "Download failed: no data stored. Try again after playing for a few seconds."
      );
    }
  });
  log("Browser button activated.");
})();

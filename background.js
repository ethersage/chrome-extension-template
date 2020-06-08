(() => {
  const debug = (msg) => console.debug(`[PU DUMP]: ${msg}`);
  const log = (msg) => console.log(`[PU DUMP]: ${msg}`);
  let data;
  let url;

  log("Loading...");

  chrome.runtime.onMessage.addListener((message) => {
    debug("Message received:", JSON.stringify(message));

    if (message.source === "pu-dump") {
      data = message.data;
      debug("Dump complete.");
    }
  });
  log("Listening for messages from content script.");

  chrome.browserAction.onClicked.addListener(() => {
    if (data) {
      debug(`Download requested.`);

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      URL.revokeObjectURL(url);
      url = URL.createObjectURL(blob);

      chrome.downloads.download({
        filename: "pu-dump.json",
        url: url,
        conflictAction: "overwrite",
      });
    } else {
      log(
        "Download failed: no data stored. Try again after playing for a few seconds."
      );
    }
  });
  log("Browser button activated.");
})();

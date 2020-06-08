const debug = (msg) => console.debug(`[PU DUMP]: ${msg}`);
const log = (msg) => console.log(`[PU DUMP]: ${msg}`);

log(
  "Injecting console hook script into page, see main log to confirm execution..."
);

chrome.devtools.inspectedWindow.eval(`
  console.log("[PU DUMP]: hook script confirmed.");

  if (!window.originalLog) {
    console.log("[PU DUMP]: Hooking console.log...");

    window.originalLog = console.log.bind(console);
    console.log = (...messages) => {
      window.originalLog(...messages);

      console.debug("[PU DUMP]:", ...messages);
      const [name, data] = messages;

      if (name === 'next state') {
        console.debug("[PU DUMP]:", "Next state captured. Notifying contents script.");

        try {
          window.postMessage({
            data,
            source: 'pu-dump'
          }, '*');

          console.debug("[PU DUMP]: Message sent.");
        } catch (err) {
          console.debug("[PU DUMP]: Message failed - ", err);
        }
      }
    };

    window.originalLog("[PU DUMP]: console.log hooked.");
  } else {
    window.originalLog("[PU DUMP]: console.log already hooked.");
  }
`);

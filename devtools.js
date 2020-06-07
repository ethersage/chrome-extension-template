chrome.devtools.panels.create(
  "PU Dump",
  "MyPanelIcon.png",
  "panel.html",
  function (panel) {}
);

chrome.devtools.inspectedWindow.eval(
  `
    console.log("hooking console.log");
    if (!window.originalLog) {
        window.originalLog = console.log.bind(console);
        console.log = (name, data) => {
            window.originalLog(name, data);
            window.postMessage({
                data,
                source: 'pu-dump'
            }, '*');
        };
    }
  `
);

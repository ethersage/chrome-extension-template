chrome.runtime.onMessage.addListener((message) => {
  if (message.source === "pu-dump") {
    const a = document.querySelectorAll("#download")[0];
    a.innerHTML = "";
    a.setAttribute("download", "pu-dump.json");
    const dataUrl = `data:application/json,${JSON.stringify(message.data)}`;
    a.setAttribute("href", dataUrl);
    const text = document.createTextNode("Download dump JSON, sucka, HAIL!");
    a.appendChild(text);
  }
});

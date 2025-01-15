chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    fetch('http://localhost:5000/summarize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: request.text })
    })
    .then(response => response.json())
    .then(data => {
      sendResponse({ summary: data.summary });
    })
    .catch(error => {
      sendResponse({ summary: "Error summarizing text." });
    });

    return true;
  }
});

document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString().trim();
  
    if (selectedText) {
      chrome.runtime.sendMessage({ action: "summarize", text: selectedText }, (response) => {
        if (response.summary) {
          alert(`Summary: ${response.summary}`);
        } else {
          alert("Error: Could not summarize the text.");
        }
      });
    }
  });
  
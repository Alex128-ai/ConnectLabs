// background.js
// Placeholder for potential external API checks (e.g., Google Safe Browsing)
// Currently only listens for messages but does not perform remote requests.

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkDomain') {
    // Example structure for future API call
    // fetch('https://safe-browsing.example.com/check?domain=' + message.domain)
    //   .then(res => res.json())
    //   .then(data => sendResponse({ safe: data.safe }));
    // return true; // Keeps the message channel open for async response
    sendResponse({ safe: true });
  }
});

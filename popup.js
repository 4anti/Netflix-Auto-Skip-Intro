document.addEventListener('DOMContentLoaded', () => {
  // Load the saved settings when the popup is opened
  chrome.storage.local.get('enabled', (data) => {
    document.getElementById('toggle-switch').checked = data.enabled || false;
  });

  // Add event listener for the toggle switch
  document.getElementById('toggle-switch').addEventListener('change', (event) => {
    const enabled = event.target.checked;
    chrome.storage.local.set({ enabled });
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: setEnabled,
        args: [enabled]
      });
    });
  });
});

function setEnabled(enabled) {
  if (enabled) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    observer.disconnect();
  }
}
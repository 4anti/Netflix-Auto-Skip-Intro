document.addEventListener('DOMContentLoaded', () => {
  // Load the saved settings when the popup is opened
  chrome.storage.local.get(['enabled', 'delayTime'], (data) => {
    document.getElementById('toggle-switch').checked = data.enabled || false;
    const delayTime = data.delayTime || 0;
    document.getElementById('delay-time-slider').value = delayTime;
    document.getElementById('delay-time-value').textContent = delayTime;
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

  // Add event listener for the delay time slider
  document.getElementById('delay-time-slider').addEventListener('input', (event) => {
    const delayTime = event.target.value;
    document.getElementById('delay-time-value').textContent = delayTime;
    chrome.storage.local.set({ delayTime });
  });
});

function setEnabled(enabled) {
  if (enabled) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    observer.disconnect();
  }
}
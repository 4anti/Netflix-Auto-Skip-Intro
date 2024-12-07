chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: true });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log('Tab updated:', tab); // Log the tab object

  if (changeInfo.status === 'complete' && tab.url && tab.url.includes('netflix.com')) {
    chrome.storage.local.get('enabled', (data) => {
      if (data.enabled) {
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['content.js']
        });
      }
    });
  }
});

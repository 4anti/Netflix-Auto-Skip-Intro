function modifySkipButton() {
  const skipButton = document.querySelector('.watch-video--skip-content-button');
  if (skipButton) {
    let countdown = 2;
    const interval = setInterval(() => {
      if (countdown > 0) {
        skipButton.textContent = `Skipping Intro In ${countdown}..`;
        countdown--;
      } else {
        skipButton.click();
        clearInterval(interval);
      }
    }, 1000);
  }
}

function startObserving() {
  // Check for the "Skip Intro" button once
  modifySkipButton();

  // Restart checking after 10 seconds
  setTimeout(() => {
    startObserving();
  }, 10000); // Restart after 10 seconds
}

// Listen for changes in the settings
chrome.storage.local.get('enabled', (data) => {
  if (data.enabled) {
    startObserving();
  }
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (changes.enabled) {
    if (changes.enabled.newValue) {
      startObserving();
    } else {
      // Optionally, you can add code to stop observing if needed
    }
  }
});
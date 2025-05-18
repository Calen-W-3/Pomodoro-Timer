/* global chrome */

// Keep track of the window ID to avoid opening multiple windows
let windowId = null;

// When the extension icon is clicked
chrome.action.onClicked.addListener(() => {
  // If a window is already open, focus it instead of creating a new one
  if (windowId !== null) {
    chrome.windows.get(windowId, (window) => {
      if (chrome.runtime.lastError) {
        // Window doesn't exist anymore (was closed)
        createPomodoroWindow();
      } else {
        // Focus the existing window
        chrome.windows.update(windowId, { focused: true });
      }
    });
  } else {
    // No window exists, create a new one
    createPomodoroWindow();
  }
});

// Function to create the Pomodoro window
function createPomodoroWindow() {
  chrome.windows.create({
    url: 'index.html',
    type: 'popup',
    width: 400,
    height: 600,
    focused: true
  }, (window) => {
    // Store the window ID for later reference
    windowId = window.id;
  });
}

// Listen for window close events to reset the windowId
chrome.windows.onRemoved.addListener((removedWindowId) => {
  if (windowId === removedWindowId) {
    windowId = null;
  }
});
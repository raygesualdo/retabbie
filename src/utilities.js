/* global chrome */

// Seed chrome.storage.sync
chrome.storage.sync.set({ tabGroups: [
  { name: 'Topic 1', tabs: [] },
  { name: 'Topic 2', tabs: [] },
  { name: 'Topic 3', tabs: [] },
  { name: 'Topic 4', tabs: [] },
  { name: 'Topic 5', tabs: [] },
]})

export const getSelectedTabs = () => new Promise((resolve, reject) => {
  chrome.tabs.query({
    highlighted: true,
    lastFocusedWindow: true,
  }, (tabs) => {
      resolve(tabs);
  });
});

export const getAllTabs = () => new Promise((resolve, reject) => {
  chrome.tabs.query({
    lastFocusedWindow: true,
  }, (tabs) => {
      resolve(tabs);
  });
});

export const getTabs = ({all = true}) => {
  if (all) {
    return getAllTabs()
  } else {
    return getSelectedTabs()
  }
}

export const closeTabsWithIds = (tabIds) => new Promise((resolve, reject) => {
  chrome.tabs.remove(tabIds, () => resolve());
});

export const createWindow = (urls) => new Promise((resolve) => {
  chrome.windows.create({
    url: urls,
  }, (window) => resolve(window));
});

export const createTabs = (tabs) =>
  createWindow(tabs.map((tab) => tab.url ? tab.url : tab))
    .then(window => tabs.map((tab, i) => {
      return new Promise((resolve) => {
        if (tab.pinned) {
          chrome.tabs.update(window.tabs[i].id, {pinned: true}, () => resolve());
        } else {
          resolve();
        }
      });
    }))
    .then(tabPromises => Promise.all(tabPromises));

export const getTabGroups = () => new Promise((resolve) => {
  chrome.storage.sync.get(null, (state) => resolve(state.tabGroups || []));
});

export const addTabGroup = (newTabGroup, tabGroups) => {
  tabGroups.push(newTabGroup);
  chrome.storage.sync.set({ tabGroups }, () => {
    if (chrome.runtime.error) {
      console.error(chrome.runtime.error);
    }
  });
};

export const removeTabGroup = (id, tabGroups) => {
  tabGroups.splice(id, 1);
  chrome.storage.sync.set({ tabGroups }, () => {
    if (chrome.runtime.error) {
      console.error(chrome.runtime.error);
    }
  });
};

export const clearTabGroups = () => new Promise((resolve) => {
  chrome.storage.sync.clear(() => {
    if (chrome.runtime.error) {
      console.error(chrome.runtime.error);
    }
    resolve();
  });
});

export const setSaveSelectedState = (saveSelected) => new Promise((resolve) => {
  chrome.storage.sync.set({ saveSelected }, () => {
    if (chrome.runtime.error) {
      console.error(chrome.runtime.error);
    }
    resolve();
  });
});

export const getSaveSelectedState = () => new Promise((resolve) => {
  chrome.storage.sync.get(null, (state) => resolve(state.saveSelected || false));
});

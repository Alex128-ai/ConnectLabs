// popup.js
// Displays the user's whitelisted domains and allows removal.

document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('whitelist');

  function refreshList() {
    chrome.storage.sync.get({ whitelist: [] }, (data) => {
      listEl.innerHTML = '';
      data.whitelist.forEach((domain) => {
        const li = document.createElement('li');
        const text = document.createElement('span');
        text.textContent = domain + ' ';
        const button = document.createElement('button');
        button.textContent = 'Remove';
        button.addEventListener('click', () => removeDomain(domain));
        li.appendChild(text);
        li.appendChild(button);
        listEl.appendChild(li);
      });
    });
  }

  function removeDomain(domain) {
    chrome.storage.sync.get({ whitelist: [] }, (data) => {
      const list = data.whitelist.filter((d) => d !== domain);
      chrome.storage.sync.set({ whitelist: list }, refreshList);
    });
  }

  refreshList();
});

// content.js
// Scans all links on the page and highlights those that match the blacklist.

let blacklist = [];
let whitelist = [];

// Load whitelist from storage then blacklist from extension file
chrome.storage.sync.get({ whitelist: [] }, (data) => {
  whitelist = data.whitelist;
  fetch(chrome.runtime.getURL('blacklist.json'))
    .then((resp) => resp.json())
    .then((data) => {
      blacklist = data.blacklist || [];
      scanLinks();
    })
    .catch((err) => console.error('Failed to load blacklist', err));
});

function scanLinks() {
  const links = document.querySelectorAll('a[href]');
  links.forEach((link) => {
    try {
      const url = new URL(link.href);
      const domain = url.hostname.replace(/^www\./, '');
      if (blacklist.includes(domain) && !whitelist.includes(domain)) {
        markLink(link, domain);
      }
    } catch (e) {
      // ignore invalid URLs
    }
  });
}

function markLink(link, domain) {
  link.style.border = '2px solid red';
  link.dataset.scamDomain = domain;
  link.addEventListener('click', handleClick, true);
}

function handleClick(event) {
  const domain = event.currentTarget.dataset.scamDomain;
  const proceed = confirm(
    `Warning: ${domain} is on the scam blacklist.\n` +
      'Press OK to open anyway.\n' +
      'Press Cancel to add this domain to your whitelist.'
  );

  if (!proceed) {
    // Add domain to whitelist and remove warning styles
    whitelist.push(domain);
    chrome.storage.sync.set({ whitelist });
    event.currentTarget.style.border = '';
    event.currentTarget.removeEventListener('click', handleClick, true);
    event.preventDefault();
  }
  // If proceed is true, allow the click to continue normally
}

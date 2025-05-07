// This script handles redirects for GitHub Pages with client-side routing
(function() {
  // If we're not on the GitHub Pages domain, don't do anything
  if (!window.location.hostname.includes('github.io')) return;
  
  // Get the current path without the base path
  const basePath = '/d7-fe-NameCard';
  const path = window.location.pathname.replace(basePath, '');
  
  // If we're at the root or index, don't do anything
  if (path === '/' || path === '/index.html' || path === '') return;
  
  // Check if the path exists by trying to fetch it
  fetch(window.location.href)
    .then(response => {
      // If we get a 404, redirect to the home page
      if (response.status === 404) {
        window.location.href = basePath + '/';
      }
    })
    .catch(() => {
      // On error, redirect to the home page
      window.location.href = basePath + '/';
    });
})();

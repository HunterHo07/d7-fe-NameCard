const fs = require('fs');
const path = require('path');

// Check if the out directory exists
if (!fs.existsSync(path.join(__dirname, 'out'))) {
  console.error('Error: The "out" directory does not exist. Run "bun run build" first.');
  process.exit(1);
}

// Check if index.html exists
if (!fs.existsSync(path.join(__dirname, 'out', 'index.html'))) {
  console.error('Error: index.html does not exist in the "out" directory.');
  process.exit(1);
}

// Create .nojekyll file if it doesn't exist
const nojekyllPath = path.join(__dirname, 'out', '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  console.log('Creating .nojekyll file...');
  fs.writeFileSync(nojekyllPath, '');
}

console.log('Build check passed! Your site is ready for deployment.');

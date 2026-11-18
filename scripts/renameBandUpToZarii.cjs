const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Replacements
  // 1. Specific brand phrases
  content = content.replace(/BandUp IELTS Preparation/g, 'Zarii IELTS Preparation');
  content = content.replace(/BandUp IELTS Prep/g, 'Zarii IELTS Preparation');
  content = content.replace(/BandUp IELTS/g, 'Zarii IELTS');
  content = content.replace(/BandUp Team/g, 'Zarii Team');
  content = content.replace(/BandUp Editorial Team/g, 'Zarii Editorial Team');
  content = content.replace(/BandUp Design System/g, 'Zarii Design System');
  content = content.replace(/BandUp Version:/g, 'Zarii Version:');

  // 2. Exact word BandUp (without matching BandUpgrade)
  content = content.replace(/\bBandUp\b/g, 'Zarii');

  // 3. Lowercase / kebab / snake case
  content = content.replace(/bandup-ielts/g, 'zarii-ielts');
  content = content.replace(/bandup\.org/g, 'zarii.app');
  content = content.replace(/bandup_([a-z0-9_]+)/g, 'zarii_$1');
  content = content.replace(/bandup:([a-z0-9-]+)/g, 'zarii:$1');
  content = content.replace(/BandUpIELTS_DB/g, 'ZariiIELTS_DB');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', 'dist', '.git', 'brand'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(tsx?|jsx?|html|json|md|css|svg)$/.test(entry.name)) {
      processFile(fullPath);
    }
  }
}

console.log('Starting systematic replacement of BandUp -> Zarii...');
walkDir('.');
console.log('Replacement complete.');

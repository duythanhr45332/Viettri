const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src/components', (file) => {
  if (file.endsWith('.module.css')) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    content = content.replace(/(\.section\s*\{[^}]*?)width:\s*100vw;?/g, '$1width: 100%;');
    content = content.replace(/(\.heroSection\s*\{[^}]*?)width:\s*100vw;?/g, '$1width: 100%;');
    
    // Remove max-width and margin from .section
    content = content.replace(/(\.section\s*\{[^}]*?)\s*max-width:\s*var\(--max-width\);?/g, '$1');
    content = content.replace(/(\.section\s*\{[^}]*?)\s*margin:\s*0 auto;?/g, '$1');
    content = content.replace(/(\.section\s*\{[^}]*?)width:\s*1440px;?/g, '$1width: 100%;');
    
    if (content.includes('.container {')) {
      if (!content.match(/\.container\s*\{[^}]*max-width:\s*var\(--max-width\);?/)) {
        content = content.replace(/(\.container\s*\{)/, '$1\n  max-width: var(--max-width);');
      }
      if (!content.match(/\.container\s*\{[^}]*margin:\s*0 auto;?/)) {
        content = content.replace(/(\.container\s*\{)/, '$1\n  margin: 0 auto;');
      }
    }
    
    if (original !== content) {
      console.log('Fixed', file);
      fs.writeFileSync(file, content);
    }
  }
});

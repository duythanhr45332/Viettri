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

    // Remove max-width and margin from .bgWrapper
    content = content.replace(/(\.bgWrapper\s*\{[^}]*?)\s*max-width:\s*var\(--max-width\);?/g, '$1');
    content = content.replace(/(\.bgWrapper\s*\{[^}]*?)\s*margin:\s*0 auto;?/g, '$1');

    // Also for .curveSvg in IntroSection
    content = content.replace(/(\.curveSvg\s*\{[^}]*?)\s*max-width:\s*var\(--max-width\);?/g, '$1');

    if (original !== content) {
      console.log('Fixed', file);
      fs.writeFileSync(file, content);
    }
  }
});

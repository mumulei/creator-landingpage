const fs = require('fs');
const path = './src/components/how-it-works.jsx';
let jsx = fs.readFileSync(path, 'utf8');

jsx = jsx.replace(/style=\{\{\s*scale,\s*\/\/[^\n]*\s*top:\s*'5vh'\s*\}\}/g, `style={{
          scale,
          transformOrigin: 'top center'
        }}`);

fs.writeFileSync(path, jsx);

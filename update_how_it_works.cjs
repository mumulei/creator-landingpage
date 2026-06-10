const fs = require('fs');
const path = './src/components/how-it-works.jsx';
let jsx = fs.readFileSync(path, 'utf8');

// Wrap header
jsx = jsx.replace(/<div className="how-sticky-header">[\s\S]*?<\/div>/, `<div className="how-header-sticky-wrapper">
        <div className="how-sticky-header">
          <h2 className="how-title">How it works？</h2>
          <p className="how-subtitle">From brief to content, without the chaos.</p>
        </div>
      </div>`);

// Update logic
jsx = jsx.replace(/const targetScale = 1 - \(STEPS\.length - index\) \* 0\.04;/, `const targetScale = 1 - (STEPS.length - 1 - index) * 0.04;
          const startProgress = index / (STEPS.length - 1);
          const safeStart = startProgress >= 1 ? 0.999 : startProgress;`);

jsx = jsx.replace(/range=\{\[index \* 0\.25, 1\]\}/, `range={[safeStart, 1]}`);

fs.writeFileSync(path, jsx);

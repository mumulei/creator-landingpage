const fs = require('fs');
const path = './src/index.css';
let css = fs.readFileSync(path, 'utf8');

// Update .how-works-sticky-section to be a grid
css = css.replace(/\.how-works-sticky-section\s*{[^}]*}/, `.how-works-sticky-section {
  position: relative;
  width: 100%;
  background-color: transparent;
  background-image: none;
  display: grid;
  grid-template-columns: 1fr;
}`);

// Add .how-header-sticky-wrapper before .how-sticky-header
if (!css.includes('.how-header-sticky-wrapper')) {
  css = css.replace(/\.how-sticky-header\s*{/, `.how-header-sticky-wrapper {
  grid-column: 1;
  grid-row: 1;
  position: sticky;
  top: 0;
  height: 100vh;
  pointer-events: none;
  z-index: 10;
}

.how-sticky-header {`);
}

// Ensure .how-cards-container has grid positioning
if (!css.includes('grid-column: 1;') || !css.match(/\.how-cards-container\s*{[^}]*grid-column:/)) {
  css = css.replace(/\.how-cards-container\s*{/, `.how-cards-container {
  grid-column: 1;
  grid-row: 1;`);
}

fs.writeFileSync(path, css);

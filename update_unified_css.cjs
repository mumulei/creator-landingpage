const fs = require('fs');
const path = './src/index.css';
let css = fs.readFileSync(path, 'utf8');

// Replace everything related to how-works-sticky-section grid
css = css.replace(/\.how-works-sticky-section\s*{[^}]*}/, `.how-works-sticky-section {
  position: relative;
  width: 100%;
  background-color: transparent;
  background-image: none;
}`);

// Add unified container classes
if (!css.includes('.how-unified-sticky-container')) {
  css += `\n
.how-unified-sticky-container {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
}

.how-cards-absolute-container {
  position: relative;
  width: 100%;
  max-width: 1300px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
}
`;
}

// Remove the old grid and wrappers
css = css.replace(/\.how-header-sticky-wrapper\s*{[^}]*}/, '');
css = css.replace(/\.how-cards-container\s*{[^}]*}/, '');
css = css.replace(/\.how-card-sticky-wrapper\s*{[^}]*}/, '');

fs.writeFileSync(path, css);

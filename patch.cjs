const fs = require('fs');
const path = './src/index.css';
let css = fs.readFileSync(path, 'utf8');

// Update .how-cards-container to padding-bottom: 0;
css = css.replace(/\.how-cards-container\s*{[^}]*}/, `.how-cards-container {
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding-bottom: 0px;
}`);

// Update .how-card-sticky-wrapper to align-items: flex-start and padding-top: 15vh
css = css.replace(/\.how-card-sticky-wrapper\s*{[^}]*}/, `.how-card-sticky-wrapper {
  height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 18vh;
  position: sticky;
  top: 0;
}`);

// Remove any top property from .how-step-card-desktop just in case
css = css.replace(/\.how-step-card-desktop\s*{[^}]*}/, `.how-step-card-desktop {
  position: relative;
  width: 1276px;
  height: 652px;
  flex: 0 1 auto;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 60px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  transform-origin: top center;
  background-color: #111;
}`);

fs.writeFileSync(path, css);

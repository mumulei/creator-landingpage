import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const defaultComputerPhrases = JSON.stringify(['hello, claude', 'what is a crt?', 'draw it isometric'])
const creatorComputerPhrases = JSON.stringify(['hello, creator', 'create with ai', 'ideas into content'])

// The upstream Computer has no phrase prop; customize only its bundled demo data.
function creatorComputerCopy() {
  return {
    name: 'creator-computer-copy',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('/anatomy-figures/') || !code.includes(defaultComputerPhrases)) return null
      return { code: code.replace(defaultComputerPhrases, creatorComputerPhrases), map: null }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [creatorComputerCopy(), react()],
  optimizeDeps: {
    exclude: ['anatomy-figures/computer'],
  },
  server: {
    allowedHosts: true,
  },
})

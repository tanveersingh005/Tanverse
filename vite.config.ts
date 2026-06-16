import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Auto-copy generated brain assets to public directory
const copyAssets = () => {
  const filesToCopy = [
    {
      src: 'C:\\Users\\harry\\.gemini\\antigravity\\brain\\0ae72b7c-be1c-4b23-b0a4-67d24a07b453\\quickgist_extension_1781636253719.png',
      dest: resolve(__dirname, './public/quick_gist.png')
    },
    {
      src: 'C:\\Users\\harry\\.gemini\\antigravity\\brain\\0ae72b7c-be1c-4b23-b0a4-67d24a07b453\\media__1781635341830.png',
      dest: resolve(__dirname, './public/finora.png')
    },
    {
      src: 'C:\\Users\\harry\\.gemini\\antigravity\\brain\\0ae72b7c-be1c-4b23-b0a4-67d24a07b453\\media__1781635381047.png',
      dest: resolve(__dirname, './public/brandforage_ai.png')
    },
    {
      src: 'C:\\Users\\harry\\.gemini\\antigravity\\brain\\0ae72b7c-be1c-4b23-b0a4-67d24a07b453\\media__1781635512832.png',
      dest: resolve(__dirname, './public/blinkboard.png')
    }
  ]
  filesToCopy.forEach(({ src, dest }) => {
    try {
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest)
        console.log(`[AssetSync] Successfully copied: ${src} -> ${dest}`)
      } else {
        console.log(`[AssetSync] Warning: Source file does not exist: ${src}`)
      }
    } catch (err) {
      console.error(`[AssetSync] Error:`, err)
    }
  })
}

copyAssets()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})

const manifestForPlugin = {
  registerType: 'prompt',
  includeAssests: ['favicon.ico', "apple-touc-icon.png", "masked-icon.svg"],
  manifest: {
    name: "Y",
    short_name: "Y",
    description: "This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.",
    icons: [{
      "src": "images/y-128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/y-144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/y-152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/y-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/y-256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "images/y-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
    ],
    theme_color: 'black',
    background_color: 'black',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
};



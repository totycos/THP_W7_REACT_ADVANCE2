import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const manifestForPlugin = {
  registerType: 'prompt',
  includeAssets: ['images/y-128.png', 'images/y-144.png', 'images/y-152.png', 'images/y-192.png', 'images/y-256.png', 'images/y-512.png'],
  manifest: {
    name: "Y",
    short_name: "Y",
    description: "This website is a training to React, global state handling and tokens. Here, authentification and routing will be used to create a small social media website.",
    icons: [{
      "src": "images/y-128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": 'any maskable'
    }, {
      "src": "images/y-144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": 'any maskable'
    }, {
      "src": "images/y-152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": 'any maskable'
    }, {
      "src": "images/y-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": 'any maskable'
    }, {
      "src": "images/y-256.png",
      "sizes": "256x256",
      "type": "image/png",
      "purpose": 'any maskable'
    }, {
      "src": "images/y-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": 'any maskable'
    }
    ],
    theme_color: '#000',
    background_color: '#000',
    display: "standalone",
    scope: '/',
    start_url: "/",
    orientation: 'portrait'
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})


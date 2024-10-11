import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    devSourcemap: true
  },
  /* server: {
    proxy: {
      '/api': {
        target: 'https://echarts.apache.org/examples',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
          // '^/echarts': ''
        
      }
    }
  } */
})

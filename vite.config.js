import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // proxy: {
  //   // Proxy all requests starting with /dev to the target
  //   '/dev': {
  //     target: 'https://iidqq7w3ik.execute-api.ap-south-1.amazonaws.com/',
  //     changeOrigin: true,
  //     secure: false,
  //     rewrite: (path) => path.replace(/^\/dev/, ''),
  //   },
  // },
});

module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: true
        },
      }
    }
  }
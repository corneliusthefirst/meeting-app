module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://adlin-meeting-api:3080',
          changeOrigin: true
        },
      }
    }
  }
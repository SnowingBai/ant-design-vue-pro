// vue.config.jd
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '2px'
        },
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        bypass: function(req, res) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.')
            return '/index.html'
          } else {
            console.log(req.path)
            const name = req.path.split('/api/').split('/').join('_')
            const mock = require(`./mock/${name}`)
            const result = mock(req.method)
            delete require.cache[require.resolve(`./mock/${name}`)]
            return res.send(result)
          }
        }
      }
    }
  }
};

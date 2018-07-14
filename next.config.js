module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: isServer
        ? [{ loader: 'ignore-loader' }]
        : [{ loader: 'style-loader' }, { loader: 'css-loader' }]
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: 'svg-inline-loader' }]
    })

    if (!dev) {
      config.devtool = 'source-map'

      for (const r of config.module.rules) {
        if (r.loader === 'babel-loader') {
          r.options.sourceMaps = true
        }
      }

      for (const plugin of config.plugins) {
        if (plugin.constructor.name === 'UglifyJsPlugin') {
          plugin.options.sourceMap = true
          break
        }
      }
    }

    return config
  },
  exportPathMap: function() {
    return {
      '/': {
        page: '/',
        query: { location: '', date: '', speed: '' }
      }
    }
  }
}

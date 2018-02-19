module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    config.module.rules.push({
      test: /\.css$/,
      use: isServer
        ? [{ loader: 'ignore-loader' }]
        : [{ loader: 'style-loader' }, { loader: 'css-loader' }]
    })

    return config
  },
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' }
    }
  }
}

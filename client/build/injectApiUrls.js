module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (config, options) {
      // Configure the API URL injection loader.
      config.module.rules.push(
        {
          test: /\.(js|ts|tsx)$/,
          enforce: 'pre',
          use: './build/loaders/apiUrlLoader.js'
        }
      )

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}

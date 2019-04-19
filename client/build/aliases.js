module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack (config, options) {
      const { customAliases } = nextConfig

      if (customAliases && customAliases instanceof Array) {
        for (const alias of customAliases) {
          if (alias.alias && alias.path) {
            config.resolve.alias[alias.alias] = alias.path
          }
        }
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}

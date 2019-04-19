// **********************
// PLEASE RESTART THE DEVELOPMENT SERVER IF YOU CHANGE VALUES IN THIS FILE
// **********************

const defaultConfig = {
}

const config = {
  local: {
    ...defaultConfig,
    isLocal: true,
    baseURL: 'http://localhost:8080',
    apiURLs: {
      v1: 'http://localhost:3000/'
    }
  },
  staging: {
    ...defaultConfig,
    isLocal: false,
    baseURL: 'https://dev-www.likebase.online',
    apiURLs: {
      v1: 'https://dev-api.likebase.online/'
    }
  },
  production: {
    ...defaultConfig,
    isLocal: false,
    baseURL: 'https://likebase.online',
    apiURLs: {
      v1: 'https://api.likebase.online/'
    }
  }
}

module.exports = config[process.env.APP_RELEASE_STAGE]

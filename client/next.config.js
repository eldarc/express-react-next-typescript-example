const path = require('path')
const sassMagicImporter = require('node-sass-magic-importer')

// ~~~ Next.js Plugins ~~~
const withPlugins = require('next-compose-plugins')
const injectApiUrls = require('./build/injectApiUrls')
const typescript = require('@zeit/next-typescript')
const sass = require('@zeit/next-sass')
const images = require('next-images')
const aliases = require('./build/aliases')

// ~~~ Next.js configuration ~~~
const rootPath = path.join(__dirname, './')
// const nextConfig = { /* ... */ }

// ~~~ Compose ~~~
module.exports = withPlugins([
  [injectApiUrls],
  [typescript],
  [sass, {
    sassOptions: {
      sourceMap: true,
      importer: sassMagicImporter({
        cwd: rootPath,
        packagePrefix: '~'
      })
    }
  }],
  [images],
  [aliases, {
    customAliases: [
      {
        alias: '@',
        path: rootPath
      },
      {
        alias: '@api',
        path: path.join(rootPath, 'services/api')
      }
    ]
  }]
])

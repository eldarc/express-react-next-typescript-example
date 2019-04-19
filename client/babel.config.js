const path = require('path')
const sassMagicImporter = require('node-sass-magic-importer')

module.exports = function (api) {
  api.cache(true)

  const defaultConfig = {
    'presets': [
      [
        'next/babel',
        {
          'styled-jsx': {
            'plugins': [
              [
                'styled-jsx-plugin-sass',
                {
                  sassOptions: {
                    sourceMap: true,
                    includePaths: ['./styles'],
                    importer: sassMagicImporter({
                      cwd: path.join(__dirname, './'),
                      packagePrefix: '~'
                    })
                  }
                }
              ],
              'styled-jsx-plugin-postcss'
            ]
          }
        }
      ],
      '@zeit/next-typescript/babel'
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': true }]
    ]
  }

  const testConfig = {
    'presets': [
      [
        'next/babel',
        {
          // == 'preset-env' is the only modification of the default config. ==
          'preset-env': {
            'modules': 'commonjs'
          },
          'styled-jsx': {
            'plugins': [
              [
                'styled-jsx-plugin-sass',
                {
                  sassOptions: {
                    sourceMap: true,
                    includePaths: ['./styles'],
                    importer: sassMagicImporter({
                      cwd: path.join(__dirname, './'),
                      packagePrefix: '~'
                    })
                  }
                }
              ],
              'styled-jsx-plugin-postcss'
            ]
          }
        }
      ],
      '@zeit/next-typescript/babel'
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      ['@babel/plugin-proposal-class-properties', { 'loose': true }]
    ]
  }

  return {
    env: {
      development: defaultConfig,
      production: defaultConfig,
      test: testConfig
    }
  }
}

const configuration = require('../../app.config.js')

module.exports = function (source) {
  const search = (() => {
    const placeholders = configuration.apiURLs && typeof configuration.apiURLs === 'object' ? Object.keys(configuration.apiURLs) : []
    let placeholdersString = ''

    if (placeholders && placeholders.length > 0) {
      for (const i in placeholders) {
        const placeholder = placeholders[i]
        placeholdersString += placeholder + ((i < (placeholders.length - 1)) ? '|' : '')
      }
    }

    const regexString = `@api-(${placeholdersString})\\/`
    return regexString
  })()
  const pattern = new RegExp(search, 'gm')

  return source.replace(pattern, function (match, p1, offset, string) {
    if (p1 && p1.length > 0) {
      return configuration.apiURLs[p1]
    }

    return match
  })
}

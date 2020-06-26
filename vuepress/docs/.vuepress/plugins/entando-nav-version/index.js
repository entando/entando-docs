const { path } = require('@vuepress/shared-utils')

module.exports = {
    name: 'entando-nav-version',
    enhanceAppFiles: path.resolve(__dirname, 'enhanceAppFile.js')
}
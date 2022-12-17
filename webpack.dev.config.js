/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

const path = require('path')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: '3000',
    static: path.resolve(__dirname, '../dist'),
    open: true,
    hot: true,
    liveReload: true
  }
}

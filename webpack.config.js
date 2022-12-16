/* eslint-disable global-require */
const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ],
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/icons/[name][ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/pictures/[name][ext]'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/']
      },
      {
        test: /\.html$/i,
        use: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  }
}

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod'
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config')

  return merge(baseConfig, envConfig)
}

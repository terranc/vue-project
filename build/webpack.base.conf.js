var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var vuxLoader = require('vux-loader')
var appConfig = require('../src/config.json')
var webpack = require('webpack')

var flexbox = require('postcss-flexbox')()
var remify = require('postcss-remify')({base:16})
var autoprefixer = require('autoprefixer')({browsers: ['iOS >= 8.0', 'Android >= 4', 'Chrome >= 30'], flexbox: 'no-2012'})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const webpackConfig = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    mainFields: ['jsnext:main', 'main'],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'js': resolve('src/assets/js'),
      'css': resolve('src/assets/css'),
      'images': resolve('src/assets/images'),
      'plugins': resolve('src/plugins'),
      'libs': resolve('src/libs'),
      'filters': resolve('src/filters'),
      'components': resolve('src/components'),
      'store': resolve('src/store'),
    }
  },
  externals: appConfig.externals,
  module: {
    noParse: /node_modules\/(jquey|moment|chart\.js)/,  // 哪些文件可以脱离webpack的解析
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(css|less)$/,
        loader:"style-loader!css-loader!postcss-loader!less-loader"
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?cacheDirectory',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: process.env.NODE_ENV === 'production',
      options: {
        vue: {
          loaders: utils.cssLoaders({
            sourceMap: process.env.NODE_ENV === 'production' && config.build.productionSourceMap,
            // extract: false,
            vue: true
          }),
          postcss: [flexbox, remify, autoprefixer],
          autoprefixer: false
        },
        eslint: {
          formatter: require('eslint-friendly-formatter')
        }
      }
    })
  ]
}
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    'vux-ui',
    'inline-manifest',
    {
      name: "less-theme",
      path: "src/assets/css/vux_theme.less"
    },
    'duplicate-style'
  ]
})
// module.exports = webpackConfig;
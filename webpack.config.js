'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractLESS = new ExtractTextPlugin('style.css', { allChunks: true });

const BUILD_PATH = path.resolve(__dirname, 'front/build');
const SRC_PATH = path.resolve(__dirname, 'src');
const APP_PATH = path.resolve(SRC_PATH, 'reactApp');
const ASSETS_PATH = path.resolve(SRC_PATH, 'assets');

console.log(`using NODE_ENV = ${NODE_ENV}`);

module.exports = {
  context: APP_PATH,
  entry: './app',
  output: {
    path: path.resolve(BUILD_PATH, NODE_ENV),
    filename: 'build.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      // paths
      src: SRC_PATH,
      app: APP_PATH,
      styles: path.resolve(ASSETS_PATH, 'styles'),
      img: path.resolve(ASSETS_PATH, 'img')
    }
  },

  watch: NODE_ENV === 'development',

  cache: true,

  devtool: NODE_ENV === 'production' ? null : 'inline-source-map',

  plugins: getPlugins(),

  module: {
    loaders: [

      // JS (ES6)
      {
        test: /\.js$/,
        loader: 'babel',
        include: [APP_PATH],
        query: { presets: ['es2015', 'react'] }
      },

      // LESS
      { test: /\.less$/, loader: extractLESS.extract(['css?sourceMap', 'less?sourceMap']) },

      // CSS
      { test: /\.css$/, loader: extractLESS.extract('style', 'css?sourceMap') },

      // Other stuff in css (fonts and i.e.)
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.(png|jpg)$/, loader: 'file?emitFile=true&name=[name].[ext]' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg$/, loader: 'svg-inline' },
    ]
  }
};

function getPlugins() {
  let plugins = [

    // not create build if error was occurred
    new webpack.NoErrorsPlugin(),

    // for inserting variables to code
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(NODE_ENV) }
    }),

    // for build separate css file
    extractLESS,

    new webpack.ProvidePlugin({
      React: 'react'
    }),

    // for copy index.html
    new CopyWebpackPlugin([{
      from: 'index.html',
      to: 'index.html',
      context: SRC_PATH
    }, {
      from: './assets/img/favicon.png',
      to: 'favicon.png',
      context: SRC_PATH
    }])
  ];

  addUglifyPlugin(plugins);

  return plugins;
}

function addUglifyPlugin(plugins) {
  const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: NODE_ENV === 'production',
      unsafe: true
    }
  });

  if (NODE_ENV !== 'development') {
    plugins.push(uglifyPlugin);
  }
}

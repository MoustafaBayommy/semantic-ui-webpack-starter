const webpack = require('webpack');
const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC = path.resolve(__dirname, './src');
const DIST = path.resolve(__dirname, './dist');

const extractStyles = loaders => {
  return process.env.NODE_ENV === 'production'
    ? ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: loaders
      })
    : ['style-loader'].concat(loaders);
};

module.exports = {
  entry: ['./src/main.js'],
  output: {
    filename: 'bundle.js',
    path: DIST,
    publicPath: '/'
  },
  resolve: {
    alias: {
      '../../theme.config$': path.join(__dirname, 'semantic-theme/theme.config')
    }
  },
  devServer: {
    historyApiFallback: true, // Serve your index.html in place of 404 responses.
    hot: true, // Enable Hot Module Replacement feature.
    noInfo: true, // With noInfo enabled, messages like the webpack bundle information that is shown when starting up and after each save, will be hidden. Errors and warnings will still be shown.
    open: true, // When open is enabled, the dev server will open the browser.
    overlay: true, // Show a full-screen overlay in the browser when there are compiler errors or warnings.
    port: 8080 // Specify a port number to listen for requests on.
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: SRC,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.less$/,
        use: extractStyles(['css-loader', 'less-loader'])
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/fontwoff'
      }
    ]
  },
  plugins: [
    // Create HTML files to serve webpack bundle.
    new HtmlWebpackPlugin({
      filename: path.resolve(DIST, 'index.html'),
      template: `!!handlebars-loader!${SRC}/index.hbs`, // Path to template.
      hash: true // Append a unique compilation hash to all included scripts and CSS files.
    }),
    // Remove dist folder before building.
    new CleanWebpackPlugin(DIST),
    // Extract text from a bundle, or bundles, into a separate file.
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    // Short-circuit all warning code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // Minify with dead-code elimination.
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      parallel: true
    }),
    // Enable scope hoisting.
    new webpack.optimize.ModuleConcatenationPlugin()
  ]);
}

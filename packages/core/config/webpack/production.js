/* eslint-disable import/no-unresolved */
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ShakePlugin = require('webpack-common-shake').Plugin;
const shared = require('./shared');

module.exports = {
  mode: 'production',

  // The entry point for the bundle
  entry: {
    main: shared.jsEntryPoint,
  },

  // Options affecting the output
  output: shared.output,

  // Options affecting the normal modules
  module: {
    rules: [
      // Minify images
      {
        test: shared.regex.images,
        loader: 'image-webpack-loader',
        enforce: 'pre',
      },
      // JavaScript and JSX
      {
        test: shared.regex.javascript,
        include: [shared.regex.client, shared.regex.server],
        loader: 'babel-loader',
      },
      // CSS modules, including CSS from node_modules
      {
        test: shared.regex.css,
        include: [shared.regex.client, shared.regex.node_modules],
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      shared.loaders.bitmapImages,
      shared.loaders.svgImages,
      shared.loaders.fonts,
    ],
  },

  // Additional plugins for the compiler
  plugins: [
    // Define globals for compilation
    new webpack.DefinePlugin({
      // Version from the host projects's package.json
      __VERSION__: JSON.stringify(shared.semver),
      // Useful to reduce the size of client-side libraries, e.g. react
      'process.env.NODE_ENV': '"production"',
    }),

    // Extract all node_modules into main chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      children: true,
      deepChildren: true,
      minChunks: module => module.context && module.context.includes('node_modules'),
    }),

    // Remove unused assignments to exports property
    new ShakePlugin(),

    // Enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Consistent chunk naming
    new webpack.HashedModuleIdsPlugin(),

    // Minify JavaScript
    new UglifyJsPlugin({
      // Use multi-process parallel running to improve the build speed
      parallel: true,
    }),

    // Extract CSS into a separate file
    new ExtractTextPlugin({
      filename: 'static/css/[contenthash].css',
    }),

    // Minify CSS
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: false,
    }),

    // Generate and inject favicon
    new FaviconsWebpackPlugin(shared.faviconsWebpackPlugin),

    // Copy HTML file and inject generated assets
    new HtmlWebpackPlugin({
      filename: shared.htmlCompiled,
      template: shared.htmlSource,
      inlineSource: '.css$',
    }),

    // Inline any CSS modules within the HTML file
    new HtmlWebpackInlineSourcePlugin(),
  ],

  // Modify logging
  stats: {
    // Remove children information
    children: false,
    // Remove the hash of the compilation
    hash: false,
    // Set the maximum number of modules to be shown
    maxModules: 0,
    // Add public path information
    publicPath: false,
    // Add webpack version information
    version: false,
  },

  // Make web variables accessible to webpack, e.g. window
  target: 'web',
};

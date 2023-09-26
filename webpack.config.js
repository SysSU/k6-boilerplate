const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const GlobEntries = require('webpack-glob-entries');
const NodePolyFillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: 'development',
  // Generates an entry for each test
  entry: GlobEntries('./src/*.test.ts'), 
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // K6 does not work in NodeJS, so we target web
  target: 'web',
  externals: [/^(k6|https?\:\/\/)(\/.*)?/],
  // Generate map files for compiled scripts
  devtool: "source-map",
  stats: {
    colors: true,
  },
  plugins: [
    // Clean the dist folder before each build
    new CleanWebpackPlugin(),
    // Polyfill NodeJS functions
    new NodePolyFillPlugin({
      excludeAliases: ['console'],
    }),
    // Copy assets to the destination folder
    new CopyPlugin({
      patterns: [{ 
        from: path.resolve(__dirname, 'src/data'), 
        to: path.resolve(__dirname, 'dist/data'),
        filter: (r) => !(r.includes('.json') || r.includes('.ts')),
        noErrorOnMissing: true 
      }],
    }),
  ],
  optimization: {
    // Don't minimize, as it's not used in the browser
    minimize: false,
  },
};
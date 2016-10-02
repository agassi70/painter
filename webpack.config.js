module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: './dist',
    filename: 'result.js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      { test: /\.css$/, loader: 'style!css' },
    ],
  },
}
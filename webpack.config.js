module.exports = {
  entry: './src/documentReactApp.js',
  output: {
    path: __dirname + '/public/javascripts',
    filename: 'bundle.js',
    publicPath: './public'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js','.json']
  },
  watch: false
};
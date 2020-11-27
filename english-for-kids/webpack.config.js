const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: './js/index.js',
  // devtool: 'nosources-source-map',
  devtool: 'eval-cheap-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: 'file-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
};

import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config = {
  mode: 'production',
  entry: './src/index.tsx',
  devtool: false,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      'react-dom': 'ReactDOM',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    host: 'localhost',
    port: 3000,
    hot: true,
    open: true,
  },
};
export default config;

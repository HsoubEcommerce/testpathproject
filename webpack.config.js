var path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");

module.exports = {
  entry:  {
    'app': './src/index.js',
    'assets/js/banner': './src/assets/js/banner.js',
  },
  output: {
    path: path.join(__dirname, "/app"),
    publicPath: '/',
    filename: '[name].js',
  }, 

  devServer: {
    contentBase: path.join(__dirname, "/app"),
    port: 1111,
    writeToDisk: true,
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          }
        ]
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader',
          'sass-loader'
        ]
      },

      {
        test: /\.(png|svg|jpe?g|gif)$/,
        exclude: /fonts/,
        use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "assets/images",
            }
          }
        ]
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        exclude: /images/,
        use: [
          {
            loader: "file-loader", 
            options: {
              name: '[name].[ext]',
              outputPath: "assets/fonts",
            }
          }
        ]
      },
      
    ]
  },

  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),

    new HtmlWebpackPlugin({ 
        filename: "index.html",
        template: "./src/index.html",
        chunks: ['app', 'assets/js/banner']
    }),

    new HtmlWebpackPlugin({ 
        filename: "components/banner.html",
        template: "./src/components/banner.html",
        chunks: ['app', 'assets/js/banner']
    }),

    new HtmlWebpackPlugin({ 
      filename: "components/button.html",
      template: "./src/components/button.html",
      chunks: ['app']
  }),

    new MiniCssExtractPlugin({filename: "assets/css/styles.css"}),

    new OptimizeCSSAssetsPlugin({}),

  ],
  
}
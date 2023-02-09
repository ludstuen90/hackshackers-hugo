var path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HHCleanup = require('./plugins/HHCleanup');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

var webpackConfig = {
  watch: !!process.env.WATCH,
  entry: {
    app: ['whatwg-fetch', './webpack-src/js/loader.js'],
    styles: './webpack-src/sass/screen.scss',
  },
  output: {
    path: path.resolve(__dirname, '../static/lib/'),
    publicPath: '',
    filename: '[name].js',
    jsonpFunction: 'hackshackersJsonp'
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ options: {} }),
    new MiniCssExtractPlugin({
         filename: '[name].css'
         }),
  ],
  module: {
    rules: [
        {
          enforce: "pre",
          test: /\.js$/, 
         exclude: /node_modules/,
         loader: "eslint-loader"
        },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { 
          loader: 'babel-loader',
              // include: path.resolve(__dirname, 'js'),
               options: {
                 presets: ['@babel/preset-env'],
               },
       }
      },

     {
        test: /\.scss$/,
        use:[{
           loader:  MiniCssExtractPlugin.loader,
//            options: {
 //               fallback: 'style-loader'
  //            }
              },
            {
                loader: 'css-loader', 
                options: {
                 // plugins: () => [autoprefixer()],
                 sourceMap: true,
                 },
              },
              {
                loader: 'postcss-loader',
                options: {
                 postcssOptions: {
                   parser: "postcss-scss",
                  plugins: () => [autoprefixer()],
                   },
                }
              }, 
              {
                 loader: 'sass-loader',
                 options: {
                      sourceMap: true,
               },
             },

          ]},
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'image/png'
          }
        }
        ]
      },
      {
        test: /\.jpg$/,
        use:
        [ {
          loader: 'url-loader',
          query: {
            limit: 10000,
            mimetype: 'image/jpg'
          }
        }
        ]
      },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader' },
    ],

  },
};

module.exports = webpackConfig;

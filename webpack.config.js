const webpack = require('webpack'),
  path = require('path'),
  autoprefixer = require('autoprefixer'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  context: __dirname + '/src',
  entry: './js/base.js',
  output: {
    path: __dirname + '/public',
    filename: './js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                url: false,
                sourceMap: false,
                modules: true,
                importLoaders: true,
                localIdentName: '[local]'
              }
            }, {
              loader: "postcss-loader",
              options: {
                plugins: function() {
                  return [require("autoprefixer")({
                      browsers: [
                        'last 7 versions',
                        'safari 5',
                        'ie 11',
                        'opera 12.1',
                        'ios 6',
                        'android 4'
                      ]
                    })];
                }
              }
            }, {
              loader: "sass-loader"
            }
          ]
        })
      }, {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ["babel-preset-es2015"].map(require.resolve)
            }
          }
        ]
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            }
          }, {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65
              },
              pngquant: {
                quality: "10-20",
                speed: 4
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false
                  }, {
                    removeEmptyAttrs: false
                  }
                ]
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({filename: './index.html', template: './html/index.html'}),
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),
    new ExtractTextPlugin({filename: 'css/style.min.css', allChunks: false}),
    new webpack.optimize.UglifyJsPlugin({sourceMap: false, minimize: true}),
    new CopyWebpackPlugin([
      {
        from: 'images/',
        to: 'images/'
      }
    ])
  ]
}

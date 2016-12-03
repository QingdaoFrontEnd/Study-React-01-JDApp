const path = require('path');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    // 指定打包的入口文件，每有一个键值对，就是一个入口文件
    entry: [
        "webpack-dev-server/client?http://localhost:9000",
        'webpack/hot/only-dev-server',
        "./src/index.jsx"
    ],
    // 配置打包结果，path定义了输出的文件夹，filename则定义了打包结果文件的名称，
    // filename里面的[name]会由entry中的键替换,例子中的/build/bundle.js便是生成的文件。
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js",
        publicPath: 'dist/',
    },
    // 定义了对模块的处理逻辑，这里可以用loaders定义了一系列的加载器，以及一些正则。
    // 当需要加载的文件匹配test的正则时，就会进行处理
    module: {
        // 对文件进行处理，这正是webpack强大的原因。
        // 比如这里定义了凡是.js结尾的文件都是用babel-loader做处理，
        // 而.jsx结尾的文件会先经过jsx-loader处理，然后经过babel-loader处理
        loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: [
                        "react-hot-loader/webpack",
                        'babel-loader?presets[]=react,presets[]=es2015',
                    ],
                    exclude: /node_modules/
                },
                {
                    test: /\.sass$/,
                    // loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap')
                    loader: 'style!css!sass'
                },
                // 暂不需要TypeScript依赖
                // {
                //     // specify option using quary
                //     test: /\.tsx?$/,
                //     loader: 'ts-loader?compiler=ntypescript'
                // },
                {
                    test: /\.(png|jpg)$/,
                    loader: 'url-loader?limit=10000&name=/img/[name].[ext].[hash:8]'
                }
            ],
            // specify Option using 'ts' property
            ts: {
                compiler: 'ntypescript'
            }
    },
    resolve:{
        alias:{
            // 引入Elf库
            'Elf': path.resolve(
                __dirname,
                './src/style/Elf/'
            )
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map',
    //  这里定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取出公用的部分，生成common.js
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
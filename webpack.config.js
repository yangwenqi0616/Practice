const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV == "development";


const config = {
    target: 'web',
    // entry: path.join(__dirname, 'src/index.js'),
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test:/\.vue$/,
                loader:'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    "vue-style-loader", "css-loader"
                ]  
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: '[name]aa.[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.styl/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development' :'"production'
            }
        }),
        new HTMLPlugin(),
        new VueLoaderPlugin()
    ]
}
if (isDev) {
    config.devtool = '#cheap-module-eval-source-map'
    config.devServer = {
        port: 8000,
        host: "0.0.0.0",
        overlay: {
            errors: true,
        },
        // historyFallback: {
            
        // },
        hot: true
        // open: true
    },
    config.plugins.push (
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config
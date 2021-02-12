const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    mode: 'development',
    target: ['web', 'es5'],
    // devtool: 'source-map',
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name]-[contenthash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'targets': '> 0.25%, not dead'
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(css|sass|scss)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)/,
                type: 'asset/resource',
                generator: {
                     filename: 'img/[name]-[contenthash][ext]'
                },
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65,
                            }
                        }
                    }
                ]
            },
            {
                test:/\.pug/,
                use: [
                    {
                        loader: 'html-loader',
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './css/[name]-[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/tmp/index.pug',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/tmp/access.pug',
            filename: 'access.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/tmp/members/taro.pug',
            filename: 'members/taro.html'
        }),
        new CleanWebpackPlugin(),
    ]
}

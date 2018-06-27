const path    = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const { getBuildVersion, getProjectName } = require('./bin/utils');

const isProd = process.env.NODE_ENV === 'production';


module.exports = (function() {
    const options = {
        devtool: !isProd ? 'eval' : 'source-map',
        stats: {
            children: false
        },
        devServer: {
            contentBase: './public',
            noInfo: true,
            port: '3000',
            proxy: {
                '/api': 'http://localhost:3001'
            }
        },
        mode: 'none',
        entry: {
            app: './src/index.ts',
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: `[name].js`
        },
        resolve: {
            alias: {
                vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js')
            },
            extensions: ['.ts', '.js', '.vue'],
            modules: ['node_modules']
        },
        optimization: {
            minimize: isProd
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
                '__BUILD_VERSION__': JSON.stringify(getBuildVersion()),
                '__PROJECT_NAME__': JSON.stringify(getProjectName())
            }),
            new webpack.NoEmitOnErrorsPlugin()
        ],
        module: {
            rules: [{
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {}
                }]
            }, {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/]
                    }
                }]
            }]
        }
    };

    if (isProd) {
        options.plugins.push(
            new webpack.optimize.ModuleConcatenationPlugin()
        );
    } else {
        options.plugins.push(new webpack.NamedModulesPlugin());
    }

    return options;
}());

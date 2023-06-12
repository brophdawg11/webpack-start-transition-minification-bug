// eslint-disable-next-line import/default
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

const config: Configuration = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: 'src/index.html' })],
    devServer: {
        proxy: {
            '/api': {
                target: 'https://foxcav.es:443',
                changeOrigin: true,
                headers: {
                    Host: 'foxcav.es',
                },
            },
            '/api/v1/ws': {
                target: 'wss://foxcav.es:443',
                changeOrigin: true,
                ws: true,
                headers: {
                    Host: 'foxcav.es',
                },
            },
        },
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
};

// eslint-disable-next-line import/no-unused-modules, import/no-default-export
export default config;

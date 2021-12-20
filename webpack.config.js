const path = require('path');
const NodemonPlugin = require('nodemon-webpack-plugin')

const {
    NODE_ENV = 'production',
} = process.env;

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "index.js") },
    mode: NODE_ENV,
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [new NodemonPlugin()]
}
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
//CopyPlugin servira para que no me tire error cuando refresheo una pagina en el deploy
const CopyPlugin = require("copy-webpack-plugin")

//agrego el publicPath y el historyApiFallback para que las gget requests no se manejen de manera standard, y siempre "vayan" al index primero

module.exports = {
    entry: "./app/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index_bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            { test: /\.(js)$/, use: "babel-loader" },
            { test: /\.css$/, use: [ "style-loader", "css-loader" ] },

        ]
    },
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    plugins: [
        new HtmlWebpackPlugin({
            template: "app/index.html"
        }),
        new CopyPlugin({ patterns: [{ from : '_redirects' }] })
    ],
    devServer: {
        historyApiFallback: true
    }
}

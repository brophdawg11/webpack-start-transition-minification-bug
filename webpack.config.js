const HtmlWebpackPlugin = require("html-webpack-plugin");
require("webpack-dev-server");

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })],
  // turning off minification resolves the issue
  // optimization: { minimize: false },
};

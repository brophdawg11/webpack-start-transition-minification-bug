// import { EsbuildPlugin } from "esbuild-loader";
// eslint-disable-next-line import/default
import HtmlWebpackPlugin from "html-webpack-plugin";
import { Configuration } from "webpack";
import "webpack-dev-server";

const config: Configuration = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })],
  optimization: {
    // turning off minification resolves the issue
    // minimize: false,
    // Surprisingly enough minimizing with esbuild has the same issue
    // minimizer: [
    //   new EsbuildPlugin({
    //     target: "es2015", // Syntax to compile to (see options below for possible values)
    //   }),
    // ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

// eslint-disable-next-line import/no-unused-modules, import/no-default-export
export default config;

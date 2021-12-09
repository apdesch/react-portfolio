import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const template = {
  template: resolve(__dirname, "src/index.html"),
  title: "Adam Deschamp",
  favicon: resolve(__dirname, "src/favicon.ico"),
};

export default {
  mode: "production",
  devtool: false,
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": `http://localhost:${5000}/`,
    },
  },
  entry: "./src/index.tsx",
  output: {
    filename: "[name]-[fullhash:5].js",
    path: resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(template), new MiniCssExtractPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
};

import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));

const template = {
  template: resolve(__dirname, "src/static/index.html"),
  title: "Portfolio of Adam Deschamp",
  favicon: resolve(__dirname, "src/static/favicon.ico"),
};

export default {
  devtool: false,
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  entry: ["react-hot-loader/patch", "./src/index.tsx"],
  output: {
    filename: "[name]-[fullhash:5].js",
    path: resolve(__dirname, "public"),
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(template), new MiniCssExtractPlugin()],
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  performance: {
    maxAssetSize: 512000,
    maxEntrypointSize: 512000,
  },
};

const dotenv = require("dotenv");
const path = require("path");
const compression = require("compression");
const express = require("express");
const fallback = require("express-history-api-fallback");
const { createProxyMiddleware } = require("http-proxy-middleware");

dotenv.config();

const PORT = process.env.PORT || 3000;
const API_PORT = process.env.API_PORT || 5000;
const app = express();

app
  .use(compression())
  .use(
    "/api",
    createProxyMiddleware({
      target: `http://localhost:${API_PORT}/`,
      changeOrigin: true,
    }),
  )
  .use(express.static("public"))
  .use(fallback("public/index.html", { root: path.resolve() }))
  .listen(PORT, () => {
    console.log(`Current Environment: ${process.env.NODE_ENV}`);
    console.log(`Listening to port ${PORT}`);
  });

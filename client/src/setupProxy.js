const { createProxyMiddleware } = require("http-proxy-middleware");
const Port = 5000;
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://localhost:${Port}`,
      changeOrigin: true,
    })
  );
};

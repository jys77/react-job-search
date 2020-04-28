const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/jobs", { target: "http://localhost:3001/" })
  );
};

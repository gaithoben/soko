const proxy = require("http-proxy-middleware");

function setupProxy(app) {
  app.use(
    proxy("/api", {
      target: `http://127.0.0.1:1337`,
      pathRewrite: {
        "^/api": "",
      },
      headers: {
        xproxied: "1",
      },
    })
  );
}

module.exports = setupProxy;

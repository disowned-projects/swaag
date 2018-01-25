const path = require("path");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const jsonRefs = require("json-schema-ref-parser");
const chokidar = require("chokidar");
const reload = require("reload");

const defaults = {
  entryPoint: path.resolve("docs", "openapi.yaml"),
  port: "3000",
  watch: false
};

const generateHtml = async entryPoint => {
  const swaggerDocument = await jsonRefs.bundle(entryPoint);
  let html = "";
  const reloadScriptTag = "<script src='/reload/reload.js'></script>";

  const res = {
    send: h => {
      html = h;
    }
  };

  const middleware = swaggerUi.setup(swaggerDocument);
  middleware(null, res);

  return html.replace(
    `</style>\n</body>`,
    `</style>\n${reloadScriptTag}\n</body>`
  );
};

const swaag = async options => {
  const config = Object.assign({}, defaults, options);
  const app = express();

  let html = await generateHtml(config.entryPoint);

  if (config.watch) {
    const reloader = reload(app);
    const watcher = chokidar.watch(path.dirname(config.entryPoint));

    watcher.on("all", async () => {
      html = await generateHtml(config.entryPoint);
      reloader.reload();
    });
  }

  app.use(swaggerUi.serve, async (req, res) => {
    res.end(html);
  });

  app.listen(config.port, () => {
    console.log(`docs hosted at 127.0.0.1:${config.port}`);
  });
};

module.exports = swaag;

const next = require("next");
const { createServer } = require("http");
const { join } = require("path");
const { parse } = require("url");

const dev = process.env.NODE_ENV !== "production";

const port = process.env.PORT || 3000;

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    if (pathname === "/service-worker.js") {
      const filePath = join(__dirname, ".next", pathname);

      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

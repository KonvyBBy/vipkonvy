const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const html = fs.readFileSync(path.join(__dirname, "index.html"));

http
  .createServer((req, res) => {
    if (req.url === "/ping") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      return res.end("ok");
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(html);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

// Keep-alive: Render free web services sleep after 15 min without traffic.
// RENDER_EXTERNAL_URL is set automatically by Render.
const SELF_URL = process.env.RENDER_EXTERNAL_URL;
if (SELF_URL) {
  setInterval(() => {
    fetch(`${SELF_URL}/ping`)
      .then((r) => console.log(`Pinged ${SELF_URL}/ping: ${r.status}`))
      .catch((e) => console.error("Ping failed:", e.message));
  }, 10 * 60 * 1000);
}

const http = require("http");

const host = 'localhost';
const port = 8080;

const requestListener = async function (req, res) {
  res.setHeader("Content-Type", "text/plain" );

  // TODO: Make changes here to support CORS.

  res.writeHead(200);

 if (req.url === '/data') {
    res.end("If you can see this, then there are no CORS issues!\n");
 } else {
   res.end(`Open your browser navigate to https://google.com, open your console, and request http://${host}:${port}/data.\n`);
 }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
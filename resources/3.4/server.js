const http = require("http");
const path = require("path");
const fs = require('fs-extra');

const host = 'localhost';
const port = 8080;
const contentTypeToExtension = {
  'text/turtle': 'ttl',
  'application/json': 'jsonld',
  'application/json+ld': 'jsonld'
};

const defaultContentType = 'text/turtle';

const requestListener = async function (req, res) {
  const acceptHeader = req.headers?.accept;
  const contentType = getContentTypeForResponse(acceptHeader);
  const data = await getDataForContentType(contentType);

  res.setHeader("Content-Type", contentType);
  res.writeHead(200);
  res.end(data);
};

const validAcceptHeaders = Object.keys(contentTypeToExtension);

function getContentTypeForResponse(acceptHeader) {
  if (validAcceptHeaders.includes(acceptHeader)) {
    return acceptHeader;
  }

  return defaultContentType;
}

async function getDataForContentType(contentType) {
  const extension = contentTypeToExtension[contentType];

  if (extension) {
    const p = path.join(__dirname, 'data', 'data.' + extension);
    return await fs.readFile(p, 'utf8');
  }

  return null;
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
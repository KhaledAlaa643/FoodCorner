const jsonServer = require('json-server');
const server = jsonServer.create();
const imageServer = require('json-server-image');
const path = require('path');

// Specify the path to the JSON data file and the default port for the server
const dataFile = path.join(__dirname, 'db.json');
const port = 3000;

// Create a JSON Server instance and use json-server-image to serve images
const router = jsonServer.router(dataFile);
router.use('/images', imageServer(dataFile, 'images'));

server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});

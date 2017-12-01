const app = require('./lib/app');
const http = require('http');
const port = process.env.PORT || 3002;
const connect = require('./lib/connect');

connect();

const server = http.createServer(app);
server.listen(port, () => {
    console.log('server running at', server.address());
});

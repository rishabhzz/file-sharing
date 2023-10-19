const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.createReadStream('index.html').pipe(res);
    } else if (req.url === '/app.js') {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        fs.createReadStream('app.js').pipe(res);
    }
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

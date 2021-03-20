const http = require('http');  // require http core module
const hostname = 'localhost';  //
const port = 3000;             //

// set up the server   // request n response
const server = http.createServer((req, res) => {
    console.log(req.headers);
    // req.headers: access to the headers in the incoming HTTP request

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1> Hello, Friend! </h1></body></html>')// responde send back

})

// listen incoming request
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`) //back quote
})
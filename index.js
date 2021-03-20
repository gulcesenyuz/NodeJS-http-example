const http = require('http');  // require http core module
const hostname = 'localhost';  //
const port = 3000; //

//file system code module
const fs = require('fs');
// path of a file in local sys
const path = require('path');
const { runInNewContext } = require('vm');

// set up the server   // request n response
const server = http.createServer((req, res) => {

    // req.headers: access to the headers in the incoming HTTP request
    console.log(req.headers);
    console.log("request for" + req.url + " by methode " + req.method);

    if (req.method == 'GET') {
        var fileUrl;
        // not get a specific file name 
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath); //Return the extension -> .js, .html

        if (fileExt == '.html') {
            fs.access(filePath, (exists) => {
                if (!exists) {
                    res.statusCode = 404;
                    res.setHeader('Comtent-Type', 'text/html');
                    res.end('<html><body><h1> Error 404: ' + fileUrl + ' not found </h1 ></body ></html > ');
                    return;

                }
                res.statusCode = 200;
                res.setHeader('Comtent-Type', 'text/html');
                //convert that into stream of bytes then they will pipe this through to the response
                fs.createReadStream(filePath).pipe(res);

            })

        } else {
            res.statusCode = 404;
            res.setHeader('Comtent-Type', 'text/html');
            res.end('<html><body><h1> Error 404: ' + fileUrl + ' not an HTML file </h1 ></body ></html > ');
            return;

        }

    } else {
        res.statusCode = 404;
        res.setHeader('Comtent-Type', 'text/html');
        res.end('<html><body><h1> Error 404: ' + req.method + '  not supported </h1 ></body ></html > ');
        return;


    }

    /*
       res.statusCode = 200;
       res.setHeader('Content-Type', 'text/html');
       res.end('<html><body><h1> Hello, Friend! </h1></body></html>')// responde send back
   */


})

// listen incoming request
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`) //back quote
})
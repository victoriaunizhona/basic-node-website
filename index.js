const  http = require('http');
const fs = require('fs');


http.createServer( (req, res) => {
    // control for favicon
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {'Content-Type': 'image/x-icon'} );
        res.end();
        return;
    }

    const pageName = req.url.slice(1);

    res.writeHead(200, {'Content-Type': 'text/html'});

    // This line opens the file as a readable stream
    const readStream = fs.createReadStream(pageName || 'index.html','utf8')

    // This will wait until we know the readable stream is actually valid before piping
    readStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
    });

    // This catches any errors that happen while creating the readable stream (usually invalid names)
    readStream.on('error', function(err) {
        const readStream = fs.createReadStream('404.html','utf8')
        readStream.pipe(res);
    });
}).listen(8080);

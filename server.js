const http = require('http');
const fs= require('fs');
const _ = require('lodash');

const server = http.createServer((request, response) => {
    // set header content type
    response.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(request.url) {
        case '/':
            path += 'index.html';
            response.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            response.statusCode = 200;
            break;
        case '/about-me':
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        default:
            path += '404.html';
            response.statusCode = 404;
            break;
    }

    // send html files
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
            response.end
        } else {
            // response.write(data);
            response.end(data);
        }
    })
});

server.listen(3000, 'localhost',() => {
    console.log('listenig for request on port 3000');
});
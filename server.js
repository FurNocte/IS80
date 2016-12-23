var express = require('express');
var api = require('./api.js');
var app = express();
var fileUpload = require('express-fileupload');

app.use(fileUpload());

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/imagespath', function(req, res) {
    api.getImagespath().then(function(path) {
        res.status(200).json(path);
    }).fail(function(err) {
        res.status(503).json(err);
    });
});

app.get('/api/images', function(req, res) {
    api.getImages().then(function(path) {
        res.status(200).json(path);
    }).fail(function(err) {
        res.status(503).json(err);
    });
});

app.post('/api/upload', function(req, res) {
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
    api.uploadImage(req.files).then(function(path) {
        res.status(200).json(path);
    }).fail(function(err) {
        res.status(503).json(err);
    });
});

app.get('*', function(req, res) {
    var path = req.path.replace(/%20/g, ' ');
    res.sendFile(__dirname + path);
});

app.listen(8081);

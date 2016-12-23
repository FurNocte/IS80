var P = require('p-promise');
var fs = require('fs');

function getImagespath() {
    var defer = P.defer();
    var imagespath = '/Pictures/';
    defer.resolve(imagespath);
    return defer.promise;
}

function getImages() {
    var defer = P.defer();
    getImagespath().then(function(res) {
        fs.readdir(__dirname + res, function(err, files) {
            if (err)
                defer.reject(err);
            else {
                defer.resolve(files);
            }
        });
    });
    return defer.promise;
}

function uploadImage(files) {
    var defer = P.defer();
    var sampleFile = files.sampleFile;
    getImagespath().then(function(path) {
        sampleFile.mv(__dirname + path + (new Date().getTime()) + '.png', function(err) {
            if (err)
                defer.reject(err);
            else
                defer.resolve();
        });
    });
    return defer.promise;
}

exports.getImagespath = getImagespath;
exports.getImages = getImages;
exports.uploadImage = uploadImage;

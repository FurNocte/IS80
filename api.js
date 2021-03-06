var P = require('p-promise');
var fs = require('fs-extra');
var _ = require('underscore');
var config = JSON.parse(fs.readFileSync(__dirname + '/config.json', 'utf8'));

function getImagespath() {
    var defer = P.defer();
    defer.resolve(config.path);
    return defer.promise;
}

function getImages(path) {
    var defer = P.defer();
    var filespaths = [];
    path = path || '';
    getImagespath().then(function(res) {
        path = __dirname + res + path;
        fs.readdir(path, function(err, files) {
            if (err)
                defer.reject(err);
            else {
                var filespaths = [];
                files.forEach(function(el, i, array) {
                    if (fs.lstatSync(path + '/' + el).isFile())
                        filespaths.push(el);
                    if (i == array.length - 1)
                        defer.resolve(filespaths);
                });
            }
        });
    });
    return defer.promise;
}

function getDirs(path) {
    var defer = P.defer();
    var filespaths = [];
    path = path || '';
    getImagespath().then(function(res) {
        path = __dirname + res + path;
        fs.readdir(path, function(err, files) {
            if (err)
                defer.reject(err);
            else {
                var filespaths = [];
                files.forEach(function(el, i, array) {
                    if (fs.lstatSync(path + '/' + el).isDirectory())
                        filespaths.push(el);
                    if (i == array.length - 1)
                        defer.resolve(filespaths);
                });
            }
        });
    });
    return defer.promise;
}

function uploadImage(files) {
    var defer = P.defer();
    var sampleFile = files.sampleFile;
    getImagespath().then(function(path) {
        path = path + getSubdirs();
        var name = path + sampleFile.name.replace(/ /g, '');
        fs.exists(__dirname + path, function(exists) {
            if (!exists) {
                fs.mkdirs(__dirname + path, function() {
                    sampleFile.mv(__dirname + name, function(err) {
                        if (err)
                            defer.reject(err);
                        else
                            defer.resolve(name);
                    });
                });
            } else
            sampleFile.mv(__dirname + name, function(err) {
                if (err)
                    defer.reject(err);
                else
                    defer.resolve(name);
            });
        });
    });
    return defer.promise;
}

function getSubdirs() {
    return (config.subdirs.replace('%y', new Date().getFullYear())
        .replace('%m', new Date().getMonth() + 1)
        .replace('%d', new Date().getDate()) + '/');
}

exports.getImagespath = getImagespath;
exports.getImages = getImages;
exports.getDirs = getDirs;
exports.uploadImage = uploadImage;

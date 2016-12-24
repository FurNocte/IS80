xhttp = new XMLHttpRequest();

var path = window.location.search.split('=')[1] || '';

xhttp.open("GET", 'http://' + location.host + '/api/imagespath', false); // false for synchronous request
xhttp.send(null);
var imagespath = JSON.parse(xhttp.responseText);

xhttp.open("GET", 'http://' + location.host + '/api/images?path=' + path, false); // false for synchronous request
xhttp.send(null);
var images = JSON.parse(xhttp.responseText);

xhttp.open("GET", 'http://' + location.host + '/api/dirs?path=' + path, false); // false for synchronous request
xhttp.send(null);
var dirs = JSON.parse(xhttp.responseText);

images.forEach(function(el) {
    $('#images').append('<a href="' + imagespath + path + '/' + el + '"><img src="' + imagespath + path + '/' + el + '" style="max-width: 250px"/></a>');
});
dirs.forEach(function(el) {
    $('#dirs').append('<a href="./index.html?path=' + el + '">' + el + '</a><br/>');
});

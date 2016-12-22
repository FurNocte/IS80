xhttp = new XMLHttpRequest();

xhttp.open("GET", 'http://' + location.host + '/api/imagespath', false); // false for synchronous request
xhttp.send(null);
var imagespath = JSON.parse(xhttp.responseText);

xhttp.open("GET", 'http://' + location.host + '/api/images', false); // false for synchronous request
xhttp.send(null);
var images = JSON.parse(xhttp.responseText);

console.log(imagespath);
images.forEach(function(el, i) {
    console.log(el);
    if (el.match(/[A-z]*.(png|jpg)/gi))
        $('#images').append('<a href="' + imagespath.concat(el) + '"><img src="' + imagespath.concat(el) + '" style="max-width: 250px"/></a>');
});

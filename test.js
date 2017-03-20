var a = require('./index.js')
var b = new a()
    // b.editor('./assets/editor.js')

var arr = [];
for (var i = 0; i < 21; i++) arr.push(makeid())

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
b.list("hello", arr, function (a, c) {
    console.log(c)
})

/*
b.prompt("hello", "type something", function (m, c) {
    console.log(c)
})
*/
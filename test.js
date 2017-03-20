var a = require('./index.js')
var b = new a()
    // b.editor('./assets/editor.js')

/*
var arr = [];
for (var i = 0; i < 21; i++) arr.push(makeid())

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
b.search("hello", arr, function (a, c) {
    console.log(c)
})


*/
/*
b.prompt("hello", "type something", function (m, c) {
    console.log(c)
})
*/

var arr = [];
for (var i = 0; i < 25; i++) {
    var s = [];
    for (var j = 0; j < 4; j++) s.push(i)
    arr.push(s)
}


b.table("lol", {
    thead: ["a", "b", "c", "d"],
    data: arr
})
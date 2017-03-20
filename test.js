var a = require('./index.js')
var b = new a()
    // b.editor('./assets/editor.js')
var arr = [];
for (var i = 0; i < 21; i++) arr.push(i.toString())
b.list("hello", arr, function (a, c) {
    console.log(c)
})
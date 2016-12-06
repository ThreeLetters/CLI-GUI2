var a = require('./index.js')
var b = new a()
b.list("hello", {
    hello: function (a) {
        a.stop()
        throw "hello"
    },
    bye: function (a) {
        a.stop()
        throw "bye"
    }
})
var a = require('./index.js')
var b = new a()
b.list("hello", {
    hello: function (a) {
        b.box(20, 10, 20, 5, "lol", {
            hello: function (a) {
                a.stop()
                throw "[hello]"
            },
            bye: function (a) {
                a.stop()
                throw "[bye]"
            }
        })
    },
    bye: function (a) {
        a.stop()
        throw "bye"
    }
})
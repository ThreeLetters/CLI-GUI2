var a = require('./index.js')
var b = new a()
b.editor('./assets/editor.js')
    /*
    b.list("hello", {
        hello: function (a) {
            b.box(-10, -2.5, 20, 5, "lol", {
                hello: function (a) {
                    a.done()

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
    */
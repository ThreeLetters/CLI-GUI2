var a = require('./index.js')
var interface = new a()


var logger = interface.log("this is a log display")

function onKey(key) {
    if (key == "ESC") {
        interface.box(-20, -3, 40, 6, "Exit?", {
            yes: function (m) {
                m.done(); // Removes box. BTW, m === interface
                m.done(); // removes log
            },
            no: function (m) {
                m.done(); // remove box
            }
        })
    }
}


interface.addListener("key", onKey); // add keypress listener

logger.log("This is logged onto the display")
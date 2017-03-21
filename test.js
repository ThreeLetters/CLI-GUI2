var a = require('./index.js')
var b = new a()
    // b.editor('./assets/editor.js')


var logger = b.log("lol")
logger.log("hello world!")
logger.slow("hello world!", 100, function () {
    logger.clear()
})
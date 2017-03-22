var a = require('./index.js')
var interface = new a()
var logger = interface.terminal("this is a terminal", ">", function (main, output) {

})
interface.editor("./index.js", function (main, file_contents, saved) {

})
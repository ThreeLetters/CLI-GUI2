var a = require('./index.js')
var b = new a()
b.gprompt("Commands", false, [
    {
        name: "help",
        description: "Type this to get help"
},
    {
        name: "box",
        description: "display box",
        options: [
            {
                name: "x",
                description: "X coordinate",
            },
            {
                name: "y",
                description: "Y coordinate",
            },
            {
                name: "width",
                description: "width",
            },
            {
                name: "height",
                description: "height",
            },
            {
                name: "content",
                description: "content",
            }
        ]
}


], function (m, c) {
    c = c.split(" ");
    if (c[0] == "box") {
        m.box(c[1], c[2], c[3], c[4], c[5], {
            done: function (m) {
                m.done();
            }
        })
    }
})
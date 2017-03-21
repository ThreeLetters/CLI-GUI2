var a = require('./index.js')
var b = new a()
    // b.editor('./assets/editor.js')


b.gprompt("Guided Prompt", "Type something", [
    {
        name: "hello",
        options: [{
                name: "id",
                options: ["1", "2", "3", "4"]

        }, {
                name: "name",
                options: ["andrew", "song"],
                description: "write down a name"
        },
            {
                name: "test",
                options: ["this", "is", "a", "test"]
            }],
        description: "This is a sample"
},
    {
        name: "hello2",
        options: [{
            name: "num",
            description: "Choose a number"

        }],
        description: "This is a test"
}
], function (a, b) {

})
# CLI-GUI2
CLI-GUI - but much better. Graphical interface in command line.

# Features

1. List
2. Checklist
3. Search
4. Table
5. Prompt
6. Guided prompt
7. Log
8. Terminal
9. Box
10. Editor


# Documentation
## Installation
> npm install cli-gui2

## Usage
```js
var CliGui = require('cli-gui2');
var interface = new CliGui();
```

#### interface.list - List items
Arguments: title,items,call

The list function is very flexible. It can be called in four different ways.

1. Options argument as an array of strings, call argument a function
2. Options argument as an array of strings, call argument as an array of functions
3. Options argument as an array of objects
4. Options argument as an object

Example:

```js
interface.list("This is a list",["a","b","c","d"],function(main,chosen) {

})

interface.list("Another way",["a","b","c"],[
  function(main) {},
  function(main) {},
  function(main) {}
])

interface.list("Again Another way",[
  {
    name: "a",
    call: function(main) {}
  },
  {
    name: "b",
    call: function(main) {}
  }
])

interface.list("The fourth way",{
  a: function(main) {},
  b: function(main) {},
  c: function(main) {}
})

```

#### interface.checklist - List items as a checklist
Arguments: title,items,call


The checklist function is also as flexible as the list function. For usage, please refer to the list documentation. A option can also be checked on by default. To do so please set `checked` to true.


Example:

```js
interface.checklist("A is checked on by default",[
  {
    name: "a",
    checked: true,
    call: function(main) {}
  },
  {
    name: "b",
    call: function(main) {}
  }
])
```
#### interface.search - List items as a searchable list
Arguments: title,items,call


Usage is same as the usage for the List function

#### interface.table - List items as a table
Arguments: title,data


Data is an object


Example:
```js
interface.table("This is a table",{
  thead: ["a","b","c"], // this is the sticky at the top
  data: [["hello","this","is"],["a","cool","test"]], // the contents of the table
  sizes: [8,8,8], // optional: Sets the size for each column
  call: function(main,chosen) { // the callback
  
  }
})
```

#### interface.prompt - Prompt the user (text input)
Arguments: title,shadow,call


The prompt funcion prompts the user for a text input. 


Example:
```js
interface.prompt("this is a prompt","type something",function(main,output) {

})
```

#### interface.gprompt - Guided prompt
Arguments: title,shadow,options,call


The guided prompt function allows for a user-guiding prompt system


Example:
```js
var options = [
  {
    name: "hello",
    description: "Hello world", // optional
    options: [ // optional, sets arguments (ex: hello [arg1])
      {
      name: "arg1",
      options: ["a","b","c"], // optional, sets selectable options for the argument
      description: "argument 1" // optional
      }  
    ]
  }
]
interface.gprompt("this is a guided prompt","type something",options,function(main,output) {

})
```

#### interface.log - Display
Arguments: title


Returns: logger


Functions:
1. logger.log(string) - log string
2. logger.slow(string,time,callback) - log string with typing animation
3. logger.clear() - clear display
4. logger.clearRow() - clear recent row


Example:
```js
var logger = interface.log("this is a log display")
logger.log("This is logged onto the display")
```

#### interface.terminal - Terminal
Arguments: title,startchar,callback


Returns: logger


Functions:
1. logger.log(string) - log string
2. logger.slow(string,time,callback) - log string with typing animation
3. logger.clear() - clear display
4. logger.clearRow() - clear recent row


Example:
```js
var logger = interface.terminal("this is a terminal",">",function(main,output) {

})
logger.log("This is logged onto the display")
```

#### interface.box - Popup box
Arguments: x,y,width,height,content,options,call


Example: 
```js
var logger = interface.log("this is a log display")
function onKey(key) {
if (key == "ESC") {
interface.box(-20,-3,40,6,"Exit?",{
yes: function(m) {
m.done(); // Removes box. BTW, m === interface
m.done(); // removes log
},
no: function(m) {
m.done(); // remove box
}
})
}}


interface.addListener("key",onKey); // add keypress listener

logger.log("This is logged onto the display")
```

#### interface.editor - File editor
Arguments: file,callback


Example:

```js
interface.editor("./path/to/something.txt",function(main,file_contents,saved?) {

})
```

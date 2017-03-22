# CLI-GUI2
![cligui](https://cloud.githubusercontent.com/assets/13282284/24179499/d27c03ea-0e85-11e7-9166-17956f632c2e.png)

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

#### interface.stop - Stop interface
This stops the interface completely

#### interface.done - Remove layer
Used to remove "layers".

#### interface.reset - Reset interface
Resets interface

#### interface.addListener
Arguments: target,function


Adds a listener to a target


Available targets:
1. key - Key presses

#### interface.removeListener
Arguments: target,function


Removes a listener from a target

#### interface.clearListeners
Arguments: target


clears listeners from a target


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

<img width="562" alt="List" src="https://cloud.githubusercontent.com/assets/13282284/24178816/d95eecf8-0e81-11e7-9eb4-a74521c11f85.png">

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

<img width="562" alt="Checklist" src="https://cloud.githubusercontent.com/assets/13282284/24178825/e41bba18-0e81-11e7-8513-520c9ba1709e.png">

#### interface.search - List items as a searchable list
Arguments: title,items,call


Usage is same as the usage for the List function

<img width="562" alt="Search" src="https://cloud.githubusercontent.com/assets/13282284/24178826/e8bd5450-0e81-11e7-8ffd-dd07606a8366.png">

#### interface.table - List items as a table
Arguments: title,data


Data is an object


Example:
```js
interface.table("This is a table",{
  thead: ["a","b","c"], // this is the sticky at the top
  data: [["hello","this","is"],["a","cool","test"],["tables","are","fun"], // the contents of the table
  sizes: [8,8,8], // optional: Sets the size for each column
  call: function(main,chosen) { // the callback
  
  }
})
```

<img width="562" alt="Table" src="https://cloud.githubusercontent.com/assets/13282284/24178827/eca5d9e8-0e81-11e7-8f9a-ab87134852ab.png">

#### interface.prompt - Prompt the user (text input)
Arguments: title,shadow,call


The prompt funcion prompts the user for a text input. 


Example:
```js
interface.prompt("this is a prompt","type something",function(main,output) {

})
```

<img width="562" alt="Prompt" src="https://cloud.githubusercontent.com/assets/13282284/24178836/f6941e1a-0e81-11e7-8540-319f84b751a5.png">
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
  },
  {
  name: "hello_again" // spaces are not allowed
  }
]
interface.gprompt("this is a guided prompt","type something",options,function(main,output) {

})
```

<img width="562" alt="Guided prompt 1" src="https://cloud.githubusercontent.com/assets/13282284/24178838/fa71cc30-0e81-11e7-9bc4-b5f516544da1.png">

<img width="562" alt="Guided prompt 2" src="https://cloud.githubusercontent.com/assets/13282284/24178843/ff229b2e-0e81-11e7-83a2-206a7634c40a.png">
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

<img width="562" alt="Log" src="https://cloud.githubusercontent.com/assets/13282284/24178844/030df062-0e82-11e7-9ed1-f414041e4b7e.png">

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

<img width="562" alt="Terminal" src="https://cloud.githubusercontent.com/assets/13282284/24178851/10672db4-0e82-11e7-9f58-9310c690c251.png">

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
<img width="562" alt="Editor" src="https://cloud.githubusercontent.com/assets/13282284/24178853/13c5d49c-0e82-11e7-9d4d-685304728e3e.png">

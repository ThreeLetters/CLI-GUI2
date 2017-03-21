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


Example
```js
interface.prompt("this is a prompt","type something",function(main,output) {

})
```


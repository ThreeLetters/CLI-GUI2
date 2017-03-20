"use strict"
/*
    CLI-GUI2 - Command line interface library
    Copyright (C) 2016 Andrew S

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
module.exports = class Box {
    constructor(main, x, y, width, height, text, opt, calls) {
        this.main = main;
        this.vis = main.visual
        this.width = width;
        this.height = height
        this.x = x;
        this.y = y;
        this.text = this.vis.wrap(text, this.width)

        this.options = this.genOptions(opt, calls)
        this.chosen = 0;
        this.call = calls;

    }
    init() {
        this.update()
    }
    onRemove() {

    }
    genOptions(opt, c) { // generate options

        /*
        four methods
        
        1. 
        
        options: ["a","b","c"]
        call: function(main,choice) {
        
        2. 
        
        options: ["a","b","c"]
        call: [function(){},function(){},function(){}]
        
        3. 
        
        options/call: [{name: "a",call: function() {}}]
        
        4.
        
        options/call: {a: function() {}}


        final output:
        
        [
        {
        vis: (something),
        call: (something)
        }
        
        ]
        */

        var final = [];
        if (!opt[0] || !opt[0].name) { // not object array
            if (!opt[0]) { // Is an object
                for (var i in opt) {
                    final.push({
                        name: i,
                        call: opt[i]
                    })
                }
            } else { // is an array
                for (var i = 0; i < opt.length; i++) {
                    final.push({
                        name: opt[i],
                        call: (typeof c != "function") ? c[i] : null
                    })
                }
            }

        }


        final.forEach((f) => {

            f.vis = this.vis.fill(f.name)
        });
        return final;
    }
    wrap(arr, maxlen, k) {
        k = k || 0
        var results = [];

        while (0 == 0) {
            if (arr.length + k < maxlen) {
                results.push(arr);
                break;
            }
            var s = arr.slice(0, maxlen);
            var index = s.lastIndexOf(" ");
            if (index != -1) {
                results.push(s.slice(0, index))
                arr = arr.slice(index + 1)
            } else {
                results.push(arr);
                break;
            }
        }


        return results;

    }
    onKey(key) {

        switch (key) {
        case "UP":
            if (this.chosen <= 0) return
            this.chosen--;
            break;
        case "DOWN":
            if (this.chosen >= this.options.length - 1) return
            this.chosen++;
            break;
        case "ENTER":
            if (typeof this.call == "function") {
                this.call(this.main, this.chosen)

                return;
            }
            if (this.options[this.chosen].call) {
                this.options[this.chosen].call(this.main)
                return;
            }
            return
            break;
        case "LEFT":
            if (this.chosen <= 0) return
            this.chosen--;
            break;
        case "RIGHT":
            if (this.chosen >= this.options.length - 1) return
            this.chosen++;
            break;
        default:
            return
            break;
        }
        this.update()
    }

    update() {

        var a = this.y
        for (var i = 0; i < this.height; i++) {


            if (this.text[i]) this.vis.setRow(a, this.vis.centerHor(this.text[i], this.width), '\x1b[30m\x1b[47m', 1, this.x);
            else
                this.vis.setRow(a, this.vis.fill(' ', this.width), '\x1b[30m\x1b[47m', 1, this.x);

            a++;
        }
        var text = [];

        for (var i = 0; i < this.options.length; i++) {
            var name = '[' + this.options[i].name + ']'
            if (i == this.chosen) {
                text.push('\x1b[40m\x1b[37m')
                name.split("").forEach((a) => {
                    text.push(a)
                })
                text.push('\x1b[30m\x1b[47m')
            } else
                text = text.concat(name.split(""))
            text.push(" ")
        }


        text = this.wrap(text, this.width, -2)


        for (var i = 0; i < text.length; i++) {
            this.vis.setRow(a, this.vis.centerHorArray(text[i], this.width, text[i].length - 2), '\x1b[30m\x1b[47m', 1, this.x);
            a++
        }
        this.vis.update()
    }

}
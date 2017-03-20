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
module.exports = class list {
    constructor(main, title, opt, c) {
        this.main = main;
        this.vis = main.visual
        this.title = title;
        this.call = c;
        this.options = this.genOptions(opt, c)

        this.chosen = 0;


    }
    init() {
        this.update()
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
        default:
            return
            break;
        }
        this.update()
    }
    onRemove() {

    }
    update() {
        var len = this.options.length;
        var max = this.vis.height - 5;

        var a = Math.max(Math.floor(this.vis.height / 2) - len - 2, 0);

        this.vis.setRow(a, this.vis.centerHor(this.title))
        a += 2




        var counter = Math.floor(this.chosen / max);

        if (counter) this.vis.setRow(a, this.vis.centerHor("▲ ▲ ▲ ▲ ▲"));
        else {
            this.vis.clearRow(a);
            this.vis.updateRow(a)
        }

        var pointer = counter * max
        for (var i = 0; i < max && pointer < len; i++, pointer++) {
            a++;

            if (pointer == this.chosen) {

                this.vis.setRow(a, this.options[pointer].vis, '\x1b[47m\x1b[30m');
            } else
                this.vis.setRow(a, this.options[pointer].vis);
        }



        //  console.log(pointer, max)
        if (i < max && counter) {
            for (var j = 0; j <= max - i; j++) {

                this.vis.clearRow(j + a + 1);
                this.vis.updateRow(j + a + 1)
            }
        }
        if (counter < Math.floor(len / max)) {
            this.vis.setRow(++a, this.vis.centerHor("▼ ▼ ▼ ▼ ▼"));
        }
        this.vis.update()


    }
}
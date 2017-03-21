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
module.exports = class checklist {
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
                        call: opt[i],
                        checked: false
                    })
                }
            } else { // is an array
                for (var i = 0; i < opt.length; i++) {
                    final.push({
                        name: opt[i],
                        call: (typeof c != "function") ? c[i] : null,
                        checked: false
                    })
                }
            }

        } else {
            final = opt;
        }



        return final;
    }
    onKey(key) {
        switch (key) {
        case "UP":

            if (this.chosen <= 0) return
            this.chosen--;
            break;
        case "DOWN":

            if (this.chosen >= this.options.length) this.chosen = -1
            this.chosen++;
            break;
        case "ENTER":
            if (this.chosen != this.options.length) {
                this.options[this.chosen].checked = !this.options[this.chosen].checked

            } else {
                if (typeof this.call == "function") {
                    var out = [];
                    this.options.forEach((c, i) => {
                        if (c.checked) out.push(i);
                    })
                    this.call(this.main, out);
                }
                this.options.forEach((c) => {
                    if (c.checked) c.call(this.main);
                })
            }
            break;
        case "LEFT":
            this.chosen = this.options.length;
            break;
        case "RIGHT":
            this.chosen = this.options.length;
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

        var a = 0

        this.vis.setRow(a, this.vis.centerHor(this.title))
        a++




        var counter = Math.floor(this.chosen / max);

        if (counter) this.vis.setRow(a, this.vis.centerHor("▲ ▲ ▲ ▲ ▲"), "\x1b[37m\x1b[40m");
        else {
            this.vis.setRow(a, this.vis.fill(""), "\x1b[37m\x1b[40m");
        }

        var pointer = counter * max
        for (var i = 0; i < max && pointer < len; i++, pointer++) {
            a++;
            var append = (this.options[pointer].checked) ? "● " : "○ ";

            if (pointer == this.chosen) {

                this.vis.setRow(a, this.vis.fill(append + this.options[pointer].name), '\x1b[47m\x1b[30m');
            } else
                this.vis.setRow(a, this.vis.fill(append + this.options[pointer].name), "\x1b[37m\x1b[40m");
        }

        for (var j = 0; j <= max - i; j++) {

            this.vis.setRow(++a, this.vis.fill(""), "\x1b[37m\x1b[40m");

        }

        if (counter < Math.floor(len / max)) {
            this.vis.setRow(a, this.vis.centerHor("▼ ▼ ▼ ▼ ▼"), "\x1b[37m\x1b[40m");
        }
        var c = (this.chosen == this.options.length) ? "\x1b[47m\x1b[30m" : "";
        var b = (c) ? "\u001B[44m\x1b[32m" : "";
        this.vis.setRow(++a, this.vis.centerHorArray([c + "[", " ", "D", "o", "n", "e", " ", "]" + b]));
        this.vis.update()


    }
}
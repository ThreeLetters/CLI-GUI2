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
module.exports = class search {
    constructor(main, title, opt, c) {
        this.main = main;
        this.vis = main.visual
        this.title = title;
        this.call = c;
        this.options = this.genOptions(opt, c)
        this.results = this.options;
        this.chosen = 0;
        this.text = [];
        this.cursor = 0;


        this.flicker = false;

    }
    init() { // flicker
        this.interval = setInterval(function () {
            this.flicker = !this.flicker
            this.update()

        }.bind(this), 700)
        this.update()
    }
    onRemove() {
        clearInterval(this.interval)
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
            if (this.chosen < 0) return
            this.chosen--;
            break;
        case "DOWN":
            if (this.chosen >= this.options.length - 1) return
            this.chosen++;
            break;
        case "ENTER":
            if (this.chosen == -1) return this.enter();

            this.out(this.results[this.chosen]);
            return
            break;
        case "LEFT":
            if (this.chosen == -1) this.left();
            break;
        case "RIGHT":
            if (this.chosen == -1) this.right();
            break;
        case "BACK":
            if (this.chosen == -1) this.back();
            break;
        case "ESC":
            break;
        default:
            this.chosen = -1
            this.key(key)
            break;
        }
        this.update()
    }
    update() {
        if (!this.vis.getClearance(this)) return;

        var max = this.vis.height - 6;

        var a = 0;
        this.vis.reset();
        this.vis.setRow(0, this.vis.centerHor(this.title));

        a += 3;




        var buf = Math.floor(this.cursor / (this.vis.width - 1)) * (this.vis.width - 1);
        var visible = this.text.slice(buf, buf + this.vis.width - 1).join("");



        if (this.chosen == -1) {
            if (this.flicker) { // add cursor
                var pos = this.cursor - buf;

                var c = visible.slice(pos, pos + 1);
                visible = visible.slice(0, pos) + '\x1b[47m\x1b[30m' + (c ? c : " ") + "\x1b[37m\x1b[40m" + visible.slice(pos + 1);

            }
        } else if (!this.text.length) {
            visible = "\x1b[2mSearch";
        }
        if (this.text.length && this.results[0] && this.text.length < this.results[0].name.length) visible += "\x1b[2m" + this.results[0].name.substr((this.flicker) ? this.text.length + 1 : this.text.length) + "\x1b[0m"

        this.vis.setRow(1, this.vis.fill(visible), "\x1b[40m\x1b[37m");





        var chosen = Math.max(0, this.chosen)

        var counter = Math.floor(chosen / max);
        var len = this.results.length;
        if (counter) this.vis.setRow(a, this.vis.centerHor("▲ ▲ ▲ ▲ ▲"), "\x1b[40m\x1b[37m");
        else this.vis.setRow(a, this.vis.fill(""), "\x1b[40m\x1b[37m");


        var pointer = counter * max
        for (var i = 0; i < max && pointer < len; i++, pointer++) {
            a++;

            if (pointer == this.chosen) {

                this.vis.setRow(a, this.results[pointer].vis, '\x1b[47m\x1b[30m');
            } else
                this.vis.setRow(a, this.results[pointer].vis, "\x1b[40m\x1b[37m");
        }



        //  console.log(pointer, max)
        if (i < max) {
            for (var j = 0; j <= max - i; j++) {

                this.vis.setRow(++a, this.vis.fill(""), "\x1b[40m\x1b[37m");
            }
        }
        if (counter < Math.floor(len / max)) {
            this.vis.setRow(++a, this.vis.centerHor("▼ ▼ ▼ ▼ ▼"), "\x1b[40m\x1b[37m");
        } else {
            this.vis.setRow(++a, this.vis.fill(""), "\x1b[40m\x1b[37m");
        }



        this.vis.update()
    }

    enter() { // enter key
        this.text = this.results[0].name.split("")
        this.out(this.results[0]);
    }
    out(chosen) {
        if (typeof this.call == "function") {
            this.call(this.main, chosen.name)

            return;
        }
        if (chosen.call) {
            chosen.call(this.main)
            return;
        }
    }
    left() { // left key

        if (this.cursor <= 0) return;
        this.flicker = true;
        this.cursor--;
        this.update()
    }
    right() { // right key
        if (this.cursor >= this.text.length) return;
        this.flicker = true;
        this.cursor++;
        this.update()
    }
    back() { // back key
        if (this.cursor <= 0) return;
        this.flicker = true;
        this.text.splice(this.cursor - 1, 1)
        this.cursor--;
        this.results = [];
        var text = this.text.join("")
        if (!text.length) this.results = this.options;
        else
            this.options.forEach((obj) => {

                if (obj.name.substr(0, text.length) == text) this.results.push(obj);
            })
        this.update()
    }
    key(key) { // key
        this.text.splice(this.cursor, 0, key)
        this.flicker = true;
        this.cursor++;
        this.results = [];
        var text = this.text.join("")
        if (!text.length) this.results = this.options;
        else
            this.options.forEach((obj) => {

                if (obj.name.substr(0, text.length) == text) this.results.push(obj);
            })
        this.update()
    }
}
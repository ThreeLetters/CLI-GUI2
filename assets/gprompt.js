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
module.exports = class guidedprompt {
    constructor(main, title, shadow, options, call) {
        this.main = main;
        this.vis = main.visual;
        this.title = title;
        this.shadow = shadow;
        this.options = this.genOptions(options, call);
        this.call = call;
        this.text = [];
        this.index = 0;
        this.cursor = 0;
        this.flicker = false;
        this.t = false;
        this.results = [];
        this.current = false;
        this.chosen = 0;

    }
    genOptions(opt, c) { // generate options
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

        } else {
            final = opt;
        }
        return final;
    }
    init() { // flicker
        this.interval = setInterval(function () {
            if (this.t) return;
            this.flicker = !this.flicker
            this.update()

        }.bind(this), 700)
        this.update()
    }
    onRemove() {

        clearInterval(this.interval)
    }
    enter() { // enter key
        var t = this.text.join("").split(" ")
        if ((this.t || (this.index && t[this.index].length)) && this.results[this.chosen]) {
            this.t = false;
            this.results[this.chosen].split("").slice(t[this.index].length).forEach((c) => {
                this.text.push(c);
                this.cursor++;
            })
            this.text.push(" ");
            this.cursor++;
            this.chosen = 0;
            this.index++;
            this.updateSearch();
        } else if (this.results[0] && !this.index && this.text.join("") != this.results[0].name) {
            this.results[0].name.split("").slice(this.text.length).forEach((c) => {
                this.text.push(c);
                this.cursor++;
            })
            this.text.push(" ");
            this.cursor++;
            this.chosen = 0;
            this.index++;
            this.current = this.results[0]
            this.updateSearch();
        } else {

            this.call(this.main, this.text.join(""));

        }
    }
    left() { // left key
        if (this.t) {
            if (this.chosen <= 0) return
            this.chosen--;
        } else {
            if (this.cursor <= 0) return;
            this.flicker = true;
            this.cursor--;
        }

    }
    right() { // right key
        if (this.t) {
            if (this.chosen >= this.current.options[this.index - 1].options.length - 1) return;

            this.chosen++;
        } else {
            if (this.cursor >= this.text.length) return;
            this.flicker = true;
            this.cursor++;
        }

    }
    back() { // back key
        if (this.cursor <= 0) return;
        this.chosen = 0;
        this.flicker = true;

        if (this.text[this.cursor - 1] == " ") {
            this.chosen = 0;
            if (this.index == 0) this.current = false;
            else
                this.index--;
        }
        this.text.splice(this.cursor - 1, 1)
        this.cursor--;
        this.updateSearch();

    }
    updateSearch() {

        if (this.index && this.current && this.current.options && this.current.options[this.index - 1] && this.current.options[this.index - 1].options) {

            var options = this.current.options[this.index - 1].options;

            this.results = options;
            var text = this.text.join("").split(" ")

            if (text[this.index].length) {
                this.results = [];
                options.forEach((obj) => {

                    if (obj.substr(0, text[this.index].length) == text[this.index]) this.results.push(obj);
                })
            }
        } else {
            var options = this.options;
            this.results = [];

            var text = this.text.join("")
            if (text.length) {

                options.forEach((obj) => {

                    if (obj.name.substr(0, text.length) == text) this.results.push(obj);
                })
            }
        }
    }
    key(key) { // key
        this.text.splice(this.cursor, 0, key)
        this.chosen = 0;
        if (key == " ") {

            if (this.index == 0) {

                this.current = this.results[0];
                this.index = 1;

            } else {
                this.index++;
            }
        }
        this.flicker = true;
        this.cursor++;
        this.updateSearch();

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
    update() {
        if (!this.vis.getClearance(this)) return; // dont flicker if not in focus
        this.vis.reset();
        var center = this.vis.height >> 1;
        this.vis.setRow(center - 2, this.vis.centerHor(this.title));
        var buf = Math.floor(this.cursor / (this.vis.width - 1)) * (this.vis.width - 1);
        var visible = [];
        var shadow = [];
        if (this.text.length || !this.shadow) {
            visible = this.text.slice(buf, buf + this.vis.width - 1)


            if (this.flicker && !this.t) { // add cursor
                var pos = this.cursor - buf;
                visible[pos] = '\x1b[47m\x1b[30m' + (visible[pos] || " ") + '\x1b[37m\x1b[40m';

            }
        } else {
            shadow.push(this.shadow)
        }


        var t = this.text.join("").split(" ");
        if ((this.t || (this.index && t[this.index].length)) && this.results[this.chosen]) {
            shadow.push(this.results[this.chosen].substr(t[this.index].length));



        } else if (this.results[0] && !this.index) {
            shadow.push(this.results[0].name.substr(this.text.length));
        }
        if (this.index && this.current && this.current.options) {

            var str = [];
            var excuse = (t[this.index].length || this.t) ? 0 : 1;
            if (t[this.index].length || this.t) str.push("")
            this.current.options.slice(this.index - excuse).forEach((c) => {

                str.push("[" + c.name + "]");

            });
            shadow.push(str.join(" "))
        }
        var max = this.vis.height - center - 1;
        var len = this.results.length;
        var s = shadow.join("")
        if (s.length) {
            s = s.split("");
            if (this.flicker && !this.t && this.text.length) s = s.slice(1)
            var p = "\x1b[2m";
            s.forEach((c) => {
                visible.push(p + c);
                p = "";

            })
        }

        this.vis.setRow(center, this.vis.fillArray(visible), "\x1b[0m\x1b[40m\x1b[37m");
        if (this.index == 0) {
            if (this.results[0]) {
                var o = 0;
                var add = [""];
                if (this.results[0].options) this.results[0].options.forEach((c) => {
                    add.push("[" + c.name + "]")
                })
                this.vis.setRow(center + 1, this.vis.fill(this.results[0].name + add.join(" ")), "\x1b[30m\x1b[45m");

                if (this.results[0].description) { // description
                    var wr = this.wrap(("- " + this.results[0].description).split(""), this.vis.width);
                    o = wr.length;
                    wr.forEach((g, i) => {
                        this.vis.setRow(center + i + 2, this.vis.fillArray(g), "\x1b[30m\x1b[45m");
                    })
                }
                for (var i = 1; i < max - o && i < len; i++) {
                    var add = [""];
                    if (this.results[i].options) this.results[i].options.forEach((c) => {
                        add.push("[" + c.name + "]")
                    })
                    this.vis.setRow(center + i + o + 1, this.vis.fill(this.results[i].name + add.join(" ")), "\x1b[30m\x1b[47m");

                }
            }
        } else if (this.current) {
            var a = center + 1;
            if (this.current.options && this.current.options[this.index - 1]) {

                var opt = this.current.options[this.index - 1];
                if (this.results.length) {
                    var arr = [];
                    var l = 0;
                    for (var i = Math.max(this.chosen - 1, 0); i < this.results.length; i++) {
                        var o = this.results[i];
                        if (i == this.chosen && this.t) arr.push("\x1b[47m[");
                        else
                            arr.push("[")
                        o.split("").forEach((c) => {
                            arr.push(c)
                        })
                        if (i == this.chosen && this.t) arr.push("]\x1b[30m\x1b[42m");
                        else
                            arr.push("]")
                        l += 3 + o.length;
                        if (l >= this.vis.width - 4) {
                            arr.push(" ")
                            arr.push(".")
                            arr.push(".")
                            arr.push(".")
                            break;
                        }
                    }

                    this.vis.setRow(a++, this.vis.fillArray(arr), "\x1b[30m\x1b[42m")
                }
                if (opt.description) {
                    var wr = this.wrap(("[" + opt.name + "] - " + opt.description).split(""), this.vis.width);

                    wr.forEach((g, i) => {
                        this.vis.setRow(a++, this.vis.fillArray(g), "\x1b[30m\x1b[45m");
                    })
                }
            }
            if (this.current.description) { // description
                var wr = this.wrap((this.current.name + " - " + this.current.description).split(""), this.vis.width);

                wr.forEach((g, i) => {
                    this.vis.setRow(a++, this.vis.fillArray(g), "\x1b[30m\x1b[45m");
                })
            }

        }

        this.vis.update();

    }
    onKey(key) { // capture keypresses
        switch (key) {
        case "ENTER":
            this.enter()
            break;
        case "LEFT":
            this.left()
            break;
        case "RIGHT":
            this.right()
            break;
        case "UP":
            this.t = false;
            break;
        case "DOWN":
            if (this.current && this.current.options && this.current.options[this.index - 1] && this.current.options[this.index - 1].options) this.t = true;
            break;
        case "BACK":
            this.t = false;
            this.back()
            break;
        default:
            this.t = false;
            if (key != "UP" && key != "DOWN" && key != "BACK" && key != "ESC")
                this.key(key)
            break;

        }
        this.update();

    }
}
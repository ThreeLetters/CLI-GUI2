"use strict";
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
module.exports = class terminal {
    constructor(main, title, ch, call) {
        this.main = main;
        this.vis = main.visual;
        this.title = title;
        this.text = [];
        this.prev = [];
        this.call = call;
        this.data = [];
        this.cursor = 0;
        this.i = -1;
        this.flicker = true;
        this.startChar = ch || ">";

    }
    init() {
        this.interval = setInterval(function () {
            this.flicker = !this.flicker
            this.update()

        }.bind(this), 700)
        this.update()
    }
    onRemove() {
        clearInterval(this.interval)
    }

    log(l) {
        var r = this.wrap(l.split(""), this.vis.width)
        for (var i = 0; i < r.length; i++) {


            this.data.push(r[r.length - i - 1]);
            if (this.data.length >= this.vis.height - 2) this.data.splice(0, 1)
        }
        this.update();

    }
    slow(l, speed, call) {
        l = l.split("")
        var index = 0;
        var len = 0;
        var c = [];
        this.data.push(c);
        if (this.data.length >= this.vis.height - 2) this.data.splice(0, 1)
        var interval = setInterval(function () {

            var a = l[index++]
            if (!a) {
                clearInterval(interval);
                if (call) call(this.main)
                return;
            }
            c.push(a)
            len++;
            if (len >= this.vis.width - 1) {
                c = [];
                this.data.push(c);
                if (this.data.length >= this.vis.height - 2) this.data.splice(0, 1)
            }
            this.update();

        }.bind(this), speed)
        this.update();
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
    clear() {
        this.data = [];
        this.update();
    }
    clearRow() {
        this.data[this.data.length - 1] = [];
        this.update();
    }
    update() {
        if (!this.vis.getClearance(this)) return; // dont update if not in focus
        this.vis.reset();
        this.vis.setRow(0, this.vis.centerHor(this.title))
        var a = 1;
        var d = 1;
        for (var i = 0; i < this.vis.height - 2; i++) {
            if (!this.data[i] && d) { // input
                d = 0;

                var buf = Math.floor(this.cursor / (this.vis.width - 1)) * (this.vis.width - 1);
                var visible = this.text.slice(buf, buf + this.vis.width - 1)
                if (this.flicker) { // add cursor
                    var pos = this.cursor - buf;
                    visible[pos] = '\x1b[47m\x1b[30m' + (visible[pos] || " ") + '\x1b[37m\x1b[40m';

                }
                if (!buf) visible = this.startChar.split("").concat(visible);
                this.vis.setRow(a++, this.vis.fillArray(visible), "\x1b[37m\x1b[40m");
                continue;
            }

            this.vis.setRow(a++, this.vis.fillArray(this.data[i] || []), "\x1b[37m\x1b[40m");
        }

        this.vis.update();
    }
    enter() { // enter key

        this.prev.splice(0, 0, this.text)
        this.call(this.main, this.text.join(""));
        this.log(this.startChar + this.text.join(""))
        this.text = [];
        this.cursor = 0;

        this.update();
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
        this.update()
    }
    key(key) { // key
        this.text.splice(this.cursor, 0, key)
        this.flicker = true;
        this.cursor++;
        this.update()
    }
    onKey(key) {
        switch (key) {
            case "ENTER":
                this.i = -1
                this.enter()

                break;
            case "LEFT":
                this.i = -1
                this.left()
                break;
            case "RIGHT":
                this.i = -1
                this.right()
                break;
            case "BACK":
                this.i = -1
                this.back()
                break;
            case "UP":
                if (this.i >= this.prev.length - 1) return;
                this.i++;
                if (this.prev[this.i]) this.text = this.prev[this.i].slice(0);
                this.cursor = this.text.length;
                this.update();
                break;
            case "DOWN":
                if (this.i < 0) return;
                this.i--;
                if (this.prev[this.i]) this.text = this.prev[this.i].slice(0);
                else this.text = [];
                this.cursor = this.text.length;
                this.update();
                break;
            default:
                this.i = -1
                if (key != "BACK" && key != "ESC")
                    this.key(key)
                break;
        }
    }

}

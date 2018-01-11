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
module.exports = class log {
    constructor(main, title) {
        this.main = main;
        this.vis = main.visual
        this.title = title;
        this.data = [];
    }
    init() {
        this.update();
    }
    onRemove() {

    }
    log(l) {
        var r = this.wrap(l.split(""), this.vis.width)
        for (var i = 0; i < r.length; i++) {


            this.data.push(r[r.length - i - 1]);
            if (this.data.length >= this.vis.height - 1) this.data.splice(0, 1)
        }
        this.update();

    }
    slow(l, speed, call) {
        l = l.split("")
        var index = 0;
        var len = 0;
        var c = [];
        this.data.push(c);
        if (this.data.length >= this.vis.height - 1) this.data.splice(0, 1)
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
                if (this.data.length >= this.vis.height - 1) this.data.splice(0, 1)
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

        this.vis.setRow(0, this.vis.centerHor(this.title));
        for (var i = 0; i < this.vis.height - 2; i++) {
            this.vis.setRow(i + 1, this.vis.fillArray(this.data[i] || []), "\x1b[37m\x1b[40m");
        }

        this.vis.update();

    }

    onKey() {

    }



}

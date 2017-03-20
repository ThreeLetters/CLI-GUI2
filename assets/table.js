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
module.exports = class table {
    constructor(main, title, data) {
        this.main = main;
        this.vis = main.visual;

        this.title = title;
        this.data = data;

        this.chosen = 0;
    }
    init() {
        this.update()
    }
    genString(sizes, row) {
        var string = [];
        string.push("")
        for (var i = 0; i < row.length; i++) {
            string.push(this.vis.fill(row[i], sizes[i] - 1));
        }
        string.push("")
        return string.join("|");
    }
    update() {

        var sizes = [];
        var thead = this.data.thead;
        var data = this.data.data;
        var lenx = thead.length
        var leny = data.length
        if (this.data.sizes) sizes = this.data.sizes;
        else {

            var size = Math.floor(this.vis.width / lenx) - 1

            for (var i = 0; i < lenx; i++) sizes.push(size);
        }

        var a = 0

        this.vis.setRow(a++, this.vis.centerHor(this.title));



        this.vis.setRow(a, this.vis.centerHor(this.genString(sizes, thead)), "\x1b[35m\x1b[46m")
        var max = this.vis.height - 3;
        var counter = Math.floor(this.chosen / max);
        var len = leny;
        var pointer = counter * max
        for (var i = 0; i < max && pointer < len; i++, pointer++) {
            a++;

            if (pointer == this.chosen) {

                this.vis.setRow(a, this.vis.centerHor(this.genString(sizes, data[pointer])), '\x1b[47m\x1b[30m');
            } else
                this.vis.setRow(a, this.vis.centerHor(this.genString(sizes, data[pointer])), "\x1b[37m\x1b[40m");
        }
        if (i < max) {
            for (var j = 0; j <= max - i; j++) {

                this.vis.setRow(j + a + 1, this.vis.fill(""), "\x1b[37m\x1b[40m");

            }
        }
        this.vis.update();
    }
    onKey(key) {
        switch (key) {
        case "UP":
            this.up();
            break;
        case "DOWN":
            this.down();
            break;
        case "ENTER":
            this.enter();
            break;
        }
        this.update();
    }
    up() {
        if (this.chosen <= 0) return;
        this.chosen--;

    }
    down() {
        if (this.chosen >= this.data.data.length - 1) return;
        this.chosen++;
    }
    enter() {
        if (data.call) {
            data.call(this.main, this.chosen)
        }
    }
}
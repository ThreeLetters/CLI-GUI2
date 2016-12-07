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
const EOL = require('os').EOL
module.exports = class VisualService {
    constructor() {
        this.buf = 0;
        this.width = process.stdout.columns - this.buf
        this.height = process.stdout.rows
        this.screen = [];

        this.debug = false;
        this.selectsyle = "\x1b[47m\x1b[30m";
        this.visible = [];
        this.curr = false
        this.textstyle = "\x1b[32m"
        this.backround = "\u001B[44m"
        this.stdin = process.stdin;
        this.stdin.setRawMode(true);
        this.stdin.resume();
        this.stdin.setEncoding('utf8');
        process.stdout.on('resize', function () {
            this.resize()
        }.bind(this))
        this.init()
    }
    init() {
        process.stdout.write("\u001b[2J\u001b[0;0H");
        for (var b = 0; b < this.height; b++) {
            process.stdout.write(this.backround + this.fill("", this.width) + "\x1b[0m" + EOL)
        }
    }
    done() {
        this.fillscreen()
        this.reset()
    }
    set(x, y, data, layer) {

        if (!layer) layer = 0;
        if (!this.screen[y]) this.screen[y] = [];
        if (!this.screen[y][x]) this.screen[y][x] = [];
        this.screen[y][x][layer] = data

    }
    setRowMulti(row, m, ind, layer) {

        ind = ind || 0

        text = text.split("")
        var b = ind;
        this.clearRow(row)
        for (var i = 0; i < m.length; i++) {
            var a = m[i].text.split("")
            for (var j = 0; j < a.length; j++) {
                this.set(b++, row, this.genData(a[i], m[i].color), layer)

            }
        }
    }
    clearRow(row) {

        this.screen[row] = [];
    }
    updateRow(row) {

        var vis = [];
        var lastc = "";
        if (!this.screen[row]) return;
        for (var i = 0; i < this.screen[row].length; i++) {
            var a = this.screen[row][i]
            if (!a || a.length <= 0) {
                vis.push(" ")
            } else {
                var b = a[a.length - 1]

                if (lastc == b.back + b.color) {
                    vis.push(b.text)
                } else {
                    lastc = b.back + b.color

                    vis.push(b.back + b.color + b.text)
                }
            }
        }

        this.visible[row] = vis.join("")
    }
    genData(text, color, back) {

        return {
            text: text,
            color: color || "",
            back: back || this.backround + this.textstyle
        }
    }
    setRow(row, text, color, layer, ind) {

        ind = ind || 0
        if (typeof text != "object") text = text.split("")

        for (var i = 0; i < text.length; i++) {
            this.set(i + ind, row, this.genData(text[i], color), layer)

        }
        this.updateRow(row)
    }
    resize() {
        this.width = process.stdout.columns - 1;
        this.height = process.stdout.rows
        this.initVar()
        this.update()

    }
    getClearence(a) {
        if (this.curr == a) {

            return true;
        }

        return false;
    }
    setCurrent(a) {
        this.curr = a

    }
    update() {

        if (this.debug) return;
        process.stdout.write("\x1b[0m\u001B[H\u001B[2r\u001B[?25l");
        var n = this.backround + this.fill("", this.width) + EOL
        for (var b = 0; b < this.height - 1; b++) {
            if (!this.visible[b]) {

                process.stdout.write('\x1b[0m' + n)
            } else {
                process.stdout.write('\x1b[0m' + this.backround + this.visible[b] + EOL)
            }
        }
    }

    // All visual things after this.

    stop() {
        this.reset()
        process.stdout.write('\x1b[0m\u001B[0r')
        process.stdout.write("\u001b[2J\u001b[0;0H\u001B[?25h");

    }
    reset() {
        this.screen = [];
        this.visible = [];
    }
    centerHor(a, g, k) {
        if (!g) g = this.width
        if (!k) k = a.length
        var f = Math.abs(a.length - k)
        var b = (g - k - 1) / 2
        var c = "";
        for (var i = 0; i < b; i++) {
            c += " ";
        }
        c += a;
        return this.fill(c, g, c.length - f)
    }
    fill(a, b, k) {
        a = a.toString()
        if (!b) b = this.width
        if (!k) k = a.length
        var c = b - k
        for (var i = 0; i < c; i++) {
            a += " ";
        }
        return a
    }
    centerHorArray(a, g, k) {
        if (!g) g = this.width
        if (!k) k = a.length
        var f = Math.abs(a.length - k)
        var b = (g - k - 1) / 2
        var c = [];
        for (var i = 0; i < b; i++) {
            c.push(" ");
        }
        c = c.concat(a);
        return this.fillArray(c, g, c.length - f)
    }
    fillArray(a, b, k) {

        if (!b) b = this.width
        if (!k) k = a.length
        var c = b - k
        for (var i = 0; i < c; i++) {
            a.push(" ");
        }
        return a
    }
    wrap(string, maxlen) {
        var results = [];

        while (0 == 0) {
            if (string.length < maxlen) {
                results.push(string);
                break;
            }
            var s = string.substring(0, maxlen);
            var index = s.lastIndexOf(" ");
            if (index != -1) {
                results.push(s.substring(0, index))
                string = string.substring(index + 1)
            } else {
                results.push(string);
                break;
            }
        }


        return results;

    }
    fillscreen() {

        process.stdout.write("\u001B[2J")
        process.stdout.write("\x1b[0m\u001B[H\u001B[2r")
        for (var b = 0; b < this.height; b++) {
            process.stdout.write(this.backround + this.fill("", this.width) + EOL)
        }
        process.stdout.write("\x1b[0m\u001B[0m");
    }

}
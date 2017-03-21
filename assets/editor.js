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

module.exports = class editor {
    constructor(main, title, file, call) {
        this.main = main;
        this.vis = main.visual
        this.title = title
        this.file = file.split("\n");

        this.call = call;
        this.flicker = true;
        this.lastx = false;
        this.cursor = {
            x: 0,
            y: 0,
            x1: 0,
            x2: 0
        }


    }
    init() { // add flicker
        this.interval = setInterval(function () {
            this.flicker = !this.flicker
            this.update()

        }.bind(this), 700)
        this.update()
    }
    onRemove() { // remove flicker
        clearInterval(this.interval)
    }
    addCursor(line, ind, k) { // adds cursor to string

        if (ind == this.cursor.y && this.flicker) {
            var x = (k) ? this.cursor.x - k : this.cursor.x
            return line.slice(0, x) + '\x1b[47m\x1b[30m' + line.slice(x, x + 1) + "\x1b[0m\x1b[37m\x1b[40m" + line.slice(x + 1);
        } else {
            return line
        }
    }
    update() { // frame updates
        if (!this.vis.getClearance(this)) return;
        var y = 0;
        this.vis.reset()
        this.vis.setRow(y, this.vis.centerHor(this.title + " press Esc to exit"))
        y++;
        var b = this.vis.height - 3
        var buf = Math.floor(this.cursor.y / b) * b
        var bufx = Math.floor(this.cursor.x / this.vis.width) * this.vis.width
        for (var i = 0; i < this.vis.height - 3; i++) {
            var ind = buf + i
            if (!this.file[ind]) {
                var t = this.addCursor(this.vis.fill(" "), ind)
                this.vis.setRow(y++, t, '\x1b[0m\x1b[37m\x1b[40m')

                continue;
            }
            var line = this.vis.fill(this.file[ind].substr(bufx, this.vis.width))

            line = this.addCursor(line, ind, bufx)

            this.vis.setRow(y++, line, '\x1b[0m\x1b[37m\x1b[40m')
        }
        this.vis.setRow(y, this.vis.fill('Ln ' + (this.cursor.y + 1) + ' Col ' + (this.cursor.x + 1) + '      ' + this.file.length + ' lines'))
        this.vis.update()
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
            this.up()
            break;
        case "DOWN":
            this.down()
            break;
        case "ESC":
            this.esc()
            break;
        case "BACK":
            this.back()
            break;
        default:
            this.key(key)
            break;
        }
    }
    key(key) { // key press
        this.flicker = true;
        var line = this.file[this.cursor.y]
        if (!line) this.file[this.cursor.y] = key;
        else
            this.file[this.cursor.y] = line.slice(0, this.cursor.x) + key + line.slice(this.cursor.x)
        this.cursor.x++;
        this.update()
    }
    enter() { // enter key
        this.flicker = true;
        var line = this.file[this.cursor.y]
        if (!line)
            this.file.splice(this.cursor.y + 1, 0, "")
        else {
            var a = line.slice(this.cursor.x)
            this.file[this.cursor.y] = line.slice(0, this.cursor.x)
            this.file.splice(this.cursor.y + 1, 0, a)
        }
        this.cursor.y++;
        this.cursor.x = 0;
        this.update()
    }
    left() { // left key
        this.flicker = true;
        if (this.cursor.x <= 0) return this.up();
        this.cursor.x--;
        this.update()
    }
    right() { // right key
        this.flicker = true;
        var line = this.file[this.cursor.y]
        if (!line || this.cursor.x >= line.length) return this.down();
        this.cursor.x++;
        this.update()
    }
    up() { // up key
        this.flicker = true;
        if (this.cursor.y <= 0) return;
        this.cursor.y--;
        var line = this.file[this.cursor.y]
        if (!line || line.length < this.cursor.x) {
            this.lastx = this.cursor.x
            this.cursor.x = (line) ? line.length : 0;
        } else if (line && this.lastx && this.lastx <= line.length) {
            this.cursor.x = this.lastx
        }

        this.update()
    }
    down() { // down key
        this.flicker = true;

        if (this.cursor.y >= this.file.length) return;
        this.cursor.y++;
        var line = this.file[this.cursor.y]
        if (!line || line.length < this.cursor.x) {
            this.lastx = this.cursor.x
            this.cursor.x = (line) ? line.length : 0;
        } else if (line && this.lastx && this.lastx <= line.length) {
            this.cursor.x = this.lastx
        }
        this.update()
    }
    esc() { // esc key
        this.flicker = true;
        this.call(this.main, this.file.join("\n"))
    }
    back() { // back key
        this.flicker = true;
        var line = this.file[this.cursor.y]
        if (this.cursor.x > 0) {
            this.file[this.cursor.y] = line.slice(0, this.cursor.x - 1) + line.slice(this.cursor.x)
            this.cursor.x--;
        } else {
            if (this.cursor.y <= 0) return;
            var a = line ? line.slice(this.cursor.x) : false;
            this.file.splice(this.cursor.y, 1)

            this.cursor.y--;
            this.cursor.x = (this.file[this.cursor.y]) ? this.file[this.cursor.y].length : 0;
            if (a) this.file[this.cursor.y] += a
        }
        this.update()
    }


}
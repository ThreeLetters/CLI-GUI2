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
        this.flicker = false;

        this.cursor = {
            x: 0,
            y: 0,
            x1: 0,
            x2: 0
        }
        this.init()
        this.update()
    }
    init() {
        this.interval = setInterval(function () {
            this.flicker != this.flicker
            this.update()
        }.bind(this), 700)
    }
    onRemove() {
        clearInterval(this.interval)
    }
    addCursor(line) {

        return line.splice(this.cursor.x - 1, 0, "\x1b[47m\x1b[30m").splice(this.cursor.x + 1, 0, '\x1b[0m\x1b[37m\x1b[40m')
    }
    update() {
        var y = 0;
        this.vis.setRow(y, this.vis.centerHor(this.title + " press Esc to exit"))
        y++;
        var b = this.vis.height - 2
        var buf = Math.floor(this.cursor.y / b) * b
        for (var i = 0; i < this.vis.height - 3; i++) {
            var ind = buf + i
            var line = this.file[ind].split("")
            if (ind == this.cursor.y && this.flicker) {
                line = this.addCursor(line)
            }
            this.vis.setRow(y, line.join(""), '\x1b[0m\x1b[37m\x1b[40m')
        }
    }

    onKey(key) {
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
    key(key) {

    }
    enter() {

    }
    left() {

    }
    right() {

    }
    up() {

    }
    down() {

    }
    esc() {

    }
    back() {

    }


}
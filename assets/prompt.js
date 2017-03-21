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
module.exports = class prompt {
    constructor(main, title, shadow, call) {
        this.main = main;
        this.vis = main.visual;
        this.title = title;
        this.shadow = shadow.split("");
        this.call = call;
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
    enter() { // enter key
        this.call(this.main, this.text.join(""));
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

    update() {
        if (!this.vis.getClearance(this)) return; // dont flicker if not in focus
        this.vis.reset();
        var center = this.vis.height >> 1;
        this.vis.setRow(center - 2, this.vis.centerHor(this.title));
        var buf = Math.floor(this.cursor / (this.vis.width - 1)) * (this.vis.width - 1);

        if (this.text.length || !this.shadow) {
            var visible = this.text.slice(buf, buf + this.vis.width - 1)


            if (this.flicker) { // add cursor
                var pos = this.cursor - buf;

                visible[pos] = '\x1b[47m\x1b[30m' + (visible[pos] || " ") + '\x1b[37m\x1b[40m';

            }
        } else {
            var visible = [];
            var s = "\x1b[2m"
            this.shadow.forEach((c) => {
                visible.push(s + c);
                s = "";
            })

        }
        this.vis.setRow(center, this.vis.fillArray(visible), "\x1b[0m\x1b[40m\x1b[37m");
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
        case "BACK":
            this.back()
            break;
        default:
            if (key != "UP" && key != "DOWN" && key != "BACK" && key != "ESC")
                this.key(key)
            break;
        }


    }
}
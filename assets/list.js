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
module.exports = class list {
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
    genOptions(opt, c) {
        var final = [];



        if (opt[0]) {
            if (typeof c == "object") {
                opt.forEach((o, i) => {
                    if (!o.call && c[i]) o.call = c[i]
                })
            }
            final = opt
        } else {
            for (var i in opt) {
                final.push({
                    name: i,
                    call: opt[i]
                })
            }

        }

        final.forEach((f) => {

            f.vis = this.vis.fill(f.name)
        })
        return final;
    }
    onKey(key) {
        switch (key) {
        case "UP":
            if (this.chosen <= 0) return
            this.chosen--;
            break;
        case "DOWN":
            if (this.chosen >= this.options.length - 1) return
            this.chosen++;
            break;
        case "ENTER":
            if (typeof this.call == "function") {
                this.call(this.main, this.chosen)

                return;
            }
            if (this.options[this.chosen].call) {
                this.options[this.chosen].call(this.main)
                return;
            }
            return
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
        this.vis.getClearence(this)
        var a = Math.floor(this.vis.height / 2) - this.options.length - 2;

        this.vis.setRow(a, this.vis.centerHor(this.title))
        a += 2
        for (var i = 0; i < this.options.length; i++) {
            a++;
            if (i == this.chosen) {

                this.vis.setRow(a, this.options[i].vis, '\x1b[47m\x1b[30m');
            } else
                this.vis.setRow(a, this.options[i].vis);
        }
        this.vis.update()
    }
}
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
    constructor(main, title, thead, items) {
        this.main = main;
        this.vis = main.visual;
        this.title = title;
        this.thead = thead;
        this.items = items;
        this.chosen = 0;
    }
    init() {
        this.update()
    }
    update() {

    }
    onKey(key) {
        switch (key) {
        case "UP":

            break;
        case "DOWN":
            break;
        case "ENTER":
            break;
        }
    }
    up() {

    }
    down() {

    }
    enter() {

    }
}
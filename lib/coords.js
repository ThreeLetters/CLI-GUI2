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

module.exports = class Coords {
    constructor(vis) {
        this.vis = vis;
        this.xrange = 50;
        this.yrange = 25;
    }
    toReal(x, y, width, height) {
        var xdif = this.vis.width / this.xrange / 2;
        var ydif = this.vis.height / this.yrange / 2;
        x += this.xrange;
        y += this.yrange;
        return {
            x: Math.floor(x * xdif),
            y: Math.floor(y * ydif),
            width: Math.floor(width * xdif),
            height: Math.floor(height * ydif)
        }
    }
    toRelative(x, y) {
        var xdif = this.vis.width / this.xrange / 2;
        var ydif = this.vis.height / this.yrange / 2;
        x += this.xrange;
        y += this.yrange;
        return {
            x: Math.floor(x / xdif),
            y: Math.floor(y / ydif)
        }


    }

}
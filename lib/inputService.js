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
module.exports = class InputService {
    constructor(main) {
        this.main = main;
        this.stdin = process.stdin;
        this.stdin.setRawMode(true);
        this.stdin.resume();
        this.stdin.setEncoding('utf8');
        this.listeners = []
        this.outerListeners = [];
        this.listener = false;
        this.allowed = "`1234567890-=qwertyuiop[]\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNMM<>?".split("")
        this.stdin.on('data', function (key) {
            this.dataRecieved(key)

            if (key == '\u0003') {
                process.exit();
            } // ctrl-c
        }.bind(this));
    }
    stop() {
        this.reset()
        this.listeners = []
        this.listener = false;
        this.stdin.pause()

    }
    reset() {

    }
    dataRecieved(key) {
        switch (key) {
        case '\u000D': // enter
            this.enter()
            break;
        case '\u007F': // back. (mac)
            this.back()
            break;
        case '\u0008': // back. (win)
            this.back()
            break;
        case '\u001B\u005B\u0041': // up
            this.up()
            break;
        case '\u001B\u005B\u0042': // down
            this.down()
            break;
        case '\u001B\u005B\u0044': // left
            this.left()
            break;
        case '\u001B\u005B\u0043': // right
            this.right()
            break;
        case '\u001B': // esc
            this.esc()
            break;
        default:
            this.key(key)
            break;

        }
    }
    escapeChar(a) {


        if (a == " ") return true;

        if (this.allowed.indexOf(a) == -1) return false;
        return true;
    }
    addListener(f) {
        this.listeners.push(f)
        this.listener = f;
    }
    removeListener() {
        this.listeners.pop()
        this.listener = this.listeners[this.listeners.length - 1]
    }
    addOListener(f) {
        this.outerListeners.push(f)
    }
    removeOListener(f) {
        var ind = this.outerListeners.push(f)
        if (ind != -1) this.outerListeners.splice(ind, 1)
    }
    clearOListeners() {
        this.outerListeners = [];
    }
    send(msg) {
        if (!this.listener) return;

        if (!this.outerListeners.every((f) => {
                if (f(msg) === false) return false;
                else return true
            })) return;

        this.listener(msg)
    }
    back() {
        this.send("BACK")
    }
    esc() {
        this.send("ESC")
    }
    down() {
        this.send("DOWN")
    }
    up() {
        this.send("UP")
    }
    left() {
        this.send("LEFT")
    }
    right() {
        this.send("RIGHT")
    }
    key(key) {
        if (this.escapeChar(key)) this.send(key)
    }
    enter() {
        this.send("ENTER")
    }
}
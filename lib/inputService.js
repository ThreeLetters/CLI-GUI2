"use strict"
module.exports = class InputService {
    constructor() {
        this.stdin = process.stdin;
        this.stdin.setRawMode(true);
        this.stdin.resume();
        this.stdin.setEncoding('utf8');

        this.stdin.on('data', function (key) {
            this.dataRecieved(key)

            this.allowed = "`1234567890-=qwertyuiop[]\asdfghjkl;'zxcvbnm,./~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:\"ZXCVBNMM<>?".split("")
            if (key == '\u0003') {
                process.exit();
            } // ctrl-c
        }.bind(this));
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
        case '\u001': // esc
            this.esc()
            break;
        default:
            this.key(key)
            break;

        }
    }
    escapeChar(key) {


        if (a == " ") return true;
        if (this.allowed.indexOf(a) == -1) return false;
        return true;
    }
    back() {

    }
    esc() {

    }
    down() {

    }
    up() {

    }
    left() {

    }
    right() {

    }
    key(key) {

    }
    enter() {

    }
}
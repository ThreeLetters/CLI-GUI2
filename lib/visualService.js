"use strict"
module.exports = class InputService {
    constructor() {
        this.buf = 0;
        this.width = process.stdout.columns - this.buf
        this.height = process.stdout.rows
        this.screen = [];
        this.selectsyle = "\x1b[47m\x1b[30m";
        this.visible = [];
        this.textstyle = "\x1b[30m"
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

    set(x, y, data) {
        if (!this.screen[y]) this.screen[y] = [];
        this.screen[y][x] = data
        this.updateRow(y)
    }
    updateRow(row) {
        var vis = [];
        var lastc = "";
        for (var i = 0; i < this.screen[row].length; i++) {
            var a = this.screen[row][i]
            if (!a) {
                vis.push(" ")
            } else
            if (lastc == a.color) {
                vis.push(a.text)
            } else {
                lastc = a.color
                vis.push(a.color + a.text)
            }

        }
        this.visible[row] = vis
    }
    genData(text, color) {
        return {
            text: text,
            color: color
        }
    }
    setRow(row, text, color) {
        text = text.split("")
        for (var i = 0; i < text.length; i++) {
            this.set(i, row, this.genData(text[i], color || ""))

        }
    }
    resize() {
        this.width = process.stdout.columns - 1;
        this.height = process.stdout.rows
        this.initVar()
        this.update()

    }
    update() {
        var n = this.backround + this.fill("", this.width) + EOL
        for (var b = 0; b < this.height - 1; b++) {
            if (!this.visible[b]) {

                process.stdout.write(n)
            } else {
                process.stdout.write(this.visible[b] + EOL)
            }
        }
    }

    // All visual things after this.

    stop() {
        process.stdout.write('\u001B[0r')
        process.stdout.write("\u001b[2J\u001b[0;0H");

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
        if (!k) k = a.length
        var c = b - k
        for (var i = 0; i < c; i++) {
            a += " ";
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
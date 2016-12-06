"use strict"
module.exports = class list {
    constructor(main, title, opt, c) {
        this.main = main;
        this.vis = main.visual
        this.title = title;
        this.call = c;
        this.options = this.genOptions(opt, c)

        this.chosen = 0;
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
                this.call(this.chosen, this.main)

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

    update() {
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